import { describe, expect, it } from 'vitest'
import { demoReducer, initialDemoState } from './demoReducer'
import { sampleForState, summarizeSession } from './demoTelemetry'

describe('demoReducer', () => {
  it('starts in a predictable overview state', () => {
    expect(initialDemoState).toMatchObject({
      view: 'overview',
      driverState: 'attentive',
      calibrationStage: 'position',
      calibrationProgress: 0,
      warningCount: 0,
      criticalCount: 0,
      accessoryState: 'simulator-only',
    })
  })

  it('moves calibration through position, baseline, and the same ready state', () => {
    const calibration = demoReducer(initialDemoState, { type: 'START_CALIBRATION' })
    const baseline = demoReducer(calibration, { type: 'START_BASELINE' })
    const partial = demoReducer(baseline, { type: 'SET_CALIBRATION_PROGRESS', progress: 64 })
    const ready = demoReducer(partial, { type: 'COMPLETE_CALIBRATION' })

    expect(calibration.view).toBe('calibration')
    expect(baseline.calibrationStage).toBe('baseline')
    expect(partial.calibrationProgress).toBe(64)
    expect(ready).toMatchObject({ calibrationStage: 'ready', calibrationProgress: 100 })
    expect(demoReducer(calibration, { type: 'COMPLETE_CALIBRATION' })).toMatchObject({
      calibrationStage: 'ready',
      calibrationProgress: 100,
    })
  })

  it('increments alert counts once per state transition and acknowledges critical to caution', () => {
    const drive = demoReducer(
      demoReducer(initialDemoState, { type: 'COMPLETE_CALIBRATION' }),
      { type: 'ENTER_DRIVE_MODE' },
    )
    const warning = demoReducer(drive, { type: 'SIMULATE_WARNING' })
    const repeatedWarning = demoReducer(warning, { type: 'SIMULATE_WARNING' })
    const critical = demoReducer(repeatedWarning, { type: 'SIMULATE_CRITICAL' })
    const repeatedCritical = demoReducer(critical, { type: 'SIMULATE_CRITICAL' })
    const acknowledged = demoReducer(repeatedCritical, { type: 'ACKNOWLEDGE_ALERT' })

    expect(repeatedWarning.warningCount).toBe(1)
    expect(repeatedCritical.criticalCount).toBe(1)
    expect(acknowledged.driverState).toBe('caution')
  })

  it('caps telemetry at 60 samples and events at the latest six', () => {
    let state = demoReducer(
      demoReducer(initialDemoState, { type: 'COMPLETE_CALIBRATION' }),
      { type: 'ENTER_DRIVE_MODE' },
    )

    for (let second = 1; second <= 75; second += 1) {
      state = demoReducer(state, { type: 'TICK', elapsedMs: second * 1000 })
      state = demoReducer(state, { type: 'RESTORE_NORMAL' })
      state = demoReducer(state, { type: 'SIMULATE_WARNING' })
    }

    expect(state.telemetry).toHaveLength(60)
    expect(state.events).toHaveLength(6)
    expect(state.events.at(-1)?.timestampMs).toBe(75_000)
  })

  it('resets all session state to a fresh initial value', () => {
    const changed = demoReducer(initialDemoState, { type: 'START_CALIBRATION' })
    const reset = demoReducer(changed, { type: 'RESET_DEMO' })

    expect(reset).toEqual(initialDemoState)
    expect(reset).not.toBe(initialDemoState)
    expect(reset.events).not.toBe(initialDemoState.events)
  })
})

describe('deterministic telemetry', () => {
  it('returns identical samples for identical state and elapsed time', () => {
    expect(sampleForState('attentive', 12_000)).toEqual(sampleForState('attentive', 12_000))
    expect(sampleForState('attentive', 12_000)).not.toEqual(sampleForState('caution', 12_000))
  })

  it('summarizes session values from telemetry rather than placeholders', () => {
    const state = {
      ...initialDemoState,
      elapsedMs: 120_000,
      warningCount: 2,
      criticalCount: 1,
      telemetry: [
        { ...sampleForState('attentive', 1_000), fatigueRisk: 20, closureMs: 180, quality: 96 },
        { ...sampleForState('critical', 2_000), fatigueRisk: 80, closureMs: 1_800, quality: 88 },
      ],
    }

    expect(summarizeSession(state)).toEqual({
      durationMs: 120_000,
      averageFatigueRisk: 50,
      warningCount: 2,
      criticalCount: 1,
      longestClosureMs: 1_800,
      signalQuality: 92,
    })
  })
})
