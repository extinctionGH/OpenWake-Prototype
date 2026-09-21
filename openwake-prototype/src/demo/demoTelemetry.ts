import type { DemoState, DriverState, SessionSummary, TelemetrySample } from './demoTypes'

const round = (value: number, precision = 0) => {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

export function sampleForState(driverState: DriverState, elapsedMs: number): TelemetrySample {
  const seconds = elapsedMs / 1000
  const wave = Math.sin(seconds / 3)
  const shortWave = Math.cos(seconds / 2.2)

  const profile = {
    attentive: { risk: 18, perclos: 8, blink: 16, closure: 180, quality: 96, fps: 29.8 },
    caution: { risk: 61, perclos: 27, blink: 10, closure: 680, quality: 91, fps: 29.2 },
    critical: { risk: 92, perclos: 48, blink: 5, closure: 1_850, quality: 87, fps: 28.6 },
  }[driverState]

  return {
    timestampMs: elapsedMs,
    fatigueRisk: Math.max(0, Math.min(100, round(profile.risk + wave * 4))),
    perclos: Math.max(0, Math.min(100, round(profile.perclos + shortWave * 1.8, 1))),
    blinkRate: Math.max(0, round(profile.blink + wave * 1.2, 1)),
    closureMs: Math.max(0, round(profile.closure + shortWave * 36)),
    pitch: round(wave * (driverState === 'attentive' ? 1.8 : 5.2), 1),
    yaw: round(shortWave * (driverState === 'critical' ? 6.8 : 2.6), 1),
    quality: Math.max(0, Math.min(100, round(profile.quality + wave * 1.2))),
    fps: round(profile.fps + shortWave * 0.25, 1),
  }
}

export function summarizeSession(state: DemoState): SessionSummary {
  const samples = state.telemetry
  const average = (values: number[]) =>
    values.length === 0 ? 0 : Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)

  return {
    durationMs: state.elapsedMs,
    averageFatigueRisk: average(samples.map((sample) => sample.fatigueRisk)),
    warningCount: state.warningCount,
    criticalCount: state.criticalCount,
    longestClosureMs: samples.length === 0 ? 0 : Math.max(...samples.map((sample) => sample.closureMs)),
    signalQuality: average(samples.map((sample) => sample.quality)),
  }
}
