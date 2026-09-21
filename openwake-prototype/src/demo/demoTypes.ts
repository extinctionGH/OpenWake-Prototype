export type AppView = 'overview' | 'calibration' | 'drive' | 'summary'
export type DriverState = 'attentive' | 'caution' | 'critical'
export type CalibrationStage = 'position' | 'baseline' | 'ready'
export type AccessoryState = 'simulator-only'

export interface TelemetrySample {
  timestampMs: number
  fatigueRisk: number
  perclos: number
  blinkRate: number
  closureMs: number
  pitch: number
  yaw: number
  quality: number
  fps: number
}

export interface SessionEvent {
  id: string
  timestampMs: number
  severity: 'info' | 'warning' | 'critical'
  label: string
}

export interface DemoState {
  view: AppView
  driverState: DriverState
  calibrationStage: CalibrationStage
  calibrationProgress: number
  elapsedMs: number
  telemetry: TelemetrySample[]
  events: SessionEvent[]
  warningCount: number
  criticalCount: number
  accessoryState: AccessoryState
}

export type DemoAction =
  | { type: 'START_CALIBRATION' }
  | { type: 'START_BASELINE' }
  | { type: 'SET_CALIBRATION_PROGRESS'; progress: number }
  | { type: 'COMPLETE_CALIBRATION' }
  | { type: 'ENTER_DRIVE_MODE' }
  | { type: 'TICK'; elapsedMs: number }
  | { type: 'SIMULATE_WARNING' }
  | { type: 'SIMULATE_CRITICAL' }
  | { type: 'ACKNOWLEDGE_ALERT' }
  | { type: 'RESTORE_NORMAL' }
  | { type: 'END_SESSION' }
  | { type: 'RESET_DEMO' }

export interface SessionSummary {
  durationMs: number
  averageFatigueRisk: number
  warningCount: number
  criticalCount: number
  longestClosureMs: number
  signalQuality: number
}
