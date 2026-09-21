import { sampleForState } from './demoTelemetry'
import type { DemoAction, DemoState, SessionEvent } from './demoTypes'

const sampleEvents: SessionEvent[] = [
  { id: 'boot-1', timestampMs: -18_000, severity: 'info', label: 'Simulator diagnostics complete' },
  { id: 'boot-2', timestampMs: -9_000, severity: 'info', label: 'Demo signal profile loaded' },
  { id: 'boot-3', timestampMs: 0, severity: 'info', label: 'Prototype ready' },
]

function createInitialDemoState(): DemoState {
  return {
    view: 'overview',
    driverState: 'attentive',
    calibrationStage: 'position',
    calibrationProgress: 0,
    elapsedMs: 0,
    telemetry: [],
    events: sampleEvents.map((event) => ({ ...event })),
    warningCount: 0,
    criticalCount: 0,
    accessoryState: 'simulator-only',
  }
}

export const initialDemoState = createInitialDemoState()

const appendEvent = (
  events: SessionEvent[],
  timestampMs: number,
  severity: SessionEvent['severity'],
  label: string,
) => [
  ...events,
  { id: `${timestampMs}-${severity}-${label.toLowerCase().replaceAll(' ', '-')}`, timestampMs, severity, label },
].slice(-6)

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'START_CALIBRATION':
      return {
        ...state,
        view: 'calibration',
        calibrationStage: 'position',
        calibrationProgress: 0,
      }
    case 'START_BASELINE':
      return { ...state, calibrationStage: 'baseline', calibrationProgress: 0 }
    case 'SET_CALIBRATION_PROGRESS':
      return { ...state, calibrationProgress: Math.max(0, Math.min(100, action.progress)) }
    case 'COMPLETE_CALIBRATION':
      return { ...state, calibrationStage: 'ready', calibrationProgress: 100 }
    case 'ENTER_DRIVE_MODE':
      return {
        ...state,
        view: 'drive',
        driverState: 'attentive',
        elapsedMs: 0,
        telemetry: [],
        events: appendEvent(state.events, 0, 'info', 'Drive Mode started'),
      }
    case 'TICK': {
      const sample = sampleForState(state.driverState, action.elapsedMs)
      return {
        ...state,
        elapsedMs: action.elapsedMs,
        telemetry: [...state.telemetry, sample].slice(-60),
      }
    }
    case 'SIMULATE_WARNING':
      if (state.driverState === 'caution') return state
      return {
        ...state,
        driverState: 'caution',
        warningCount: state.warningCount + 1,
        events: appendEvent(state.events, state.elapsedMs, 'warning', 'Possible fatigue pattern'),
      }
    case 'SIMULATE_CRITICAL':
      if (state.driverState === 'critical') return state
      return {
        ...state,
        driverState: 'critical',
        criticalCount: state.criticalCount + 1,
        events: appendEvent(state.events, state.elapsedMs, 'critical', 'Prolonged eye closure simulated'),
      }
    case 'ACKNOWLEDGE_ALERT':
      if (state.driverState !== 'critical') return state
      return {
        ...state,
        driverState: 'caution',
        events: appendEvent(state.events, state.elapsedMs, 'info', 'Critical alert acknowledged'),
      }
    case 'RESTORE_NORMAL':
      if (state.driverState === 'attentive') return state
      return {
        ...state,
        driverState: 'attentive',
        events: appendEvent(state.events, state.elapsedMs, 'info', 'Attentive state restored'),
      }
    case 'END_SESSION':
      return {
        ...state,
        view: 'summary',
        events: appendEvent(state.events, state.elapsedMs, 'info', 'Demo session ended'),
      }
    case 'RESET_DEMO':
      return createInitialDemoState()
    default:
      return state
  }
}
