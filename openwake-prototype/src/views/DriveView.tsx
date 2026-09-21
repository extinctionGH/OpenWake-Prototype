import { useEffect, useRef } from 'react'
import { Activity, Camera, Clock3, Eye, Gauge, Move3d, ScanEye, TimerReset, Waves } from 'lucide-react'
import { CameraSimulator } from '../components/CameraSimulator'
import { DemoControls } from '../components/DemoControls'
import { EventTimeline } from '../components/EventTimeline'
import { SignalChart } from '../components/SignalChart'
import { StatusBadge } from '../components/StatusBadge'
import { sampleForState } from '../demo/demoTelemetry'
import type { DemoState } from '../demo/demoTypes'

type DriveViewProps = {
  state: DemoState
  onTick: (elapsedMs: number) => void
  onWarning: () => void
  onCritical: () => void
  onNormal: () => void
  onEnd: () => void
}

const formatDuration = (elapsedMs: number) => {
  const totalSeconds = Math.floor(elapsedMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function DriveView({ state, onTick, onWarning, onCritical, onNormal, onEnd }: DriveViewProps) {
  const elapsedRef = useRef(state.elapsedMs)
  const onTickRef = useRef(onTick)
  onTickRef.current = onTick

  useEffect(() => {
    const interval = window.setInterval(() => {
      elapsedRef.current += 1000
      onTickRef.current(elapsedRef.current)
    }, 1000)
    return () => window.clearInterval(interval)
  }, [])

  const sample = sampleForState(state.driverState, state.elapsedMs)
  const stateLabel = state.driverState === 'attentive' ? 'ATTENTIVE' : state.driverState === 'caution' ? 'CAUTION' : 'WAKE NOW'
  const stateMessage = state.driverState === 'attentive' ? 'Signals remain inside the simulated baseline.' : state.driverState === 'caution' ? 'Possible fatigue pattern' : 'Prolonged eye closure simulated'
  const tone = state.driverState === 'critical' ? 'danger' : state.driverState === 'caution' ? 'warning' : 'aqua'
  const chartSamples = state.telemetry.length > 1 ? state.telemetry : [sampleForState('attentive', 0), sample]

  return (
    <div className={`drive-view drive-view--${state.driverState}`}>
      <header className="drive-header">
        <div>
          <div className="drive-header__meta">
            <p className="eyebrow">Drive Mode / Simulated</p>
            <StatusBadge label="Local demo signal" tone="aqua" icon={Waves} />
          </div>
          <div className="driver-state" role="status" aria-live="polite">
            <span className={`driver-state__indicator driver-state__indicator--${state.driverState}`} aria-hidden="true" />
            <div><strong>{stateLabel}</strong><span>{stateMessage}</span></div>
          </div>
        </div>
        <div className="session-clock">
          <span><Clock3 size={14} aria-hidden="true" />Session</span>
          <strong data-testid="session-duration">{formatDuration(state.elapsedMs)}</strong>
          <small data-testid="sample-count">{state.telemetry.length} samples</small>
        </div>
      </header>

      <div className="drive-cockpit">
        <section className="drive-camera" aria-label="Live simulated camera area">
          <CameraSimulator status="monitoring" driverState={state.driverState} quality={sample.quality} />
          <div className={`risk-overlay risk-overlay--${state.driverState}`}>
            <span>Fatigue risk</span><strong>{sample.fatigueRisk}</strong><small>/ 100</small>
            <div className="risk-track" aria-hidden="true"><span style={{ transform: `scaleX(${sample.fatigueRisk / 100})` }} /></div>
          </div>
        </section>

        <aside className="telemetry-rail">
          <div className="telemetry-grid">
            <article className="telemetry-card telemetry-card--wide">
              <div className="telemetry-card__label"><Gauge size={15} aria-hidden="true" />Fatigue risk</div>
              <div className="telemetry-card__value"><strong>{sample.fatigueRisk}</strong><span>/ 100</span></div>
              <div className={`meter meter--${tone}`}><span style={{ transform: `scaleX(${sample.fatigueRisk / 100})` }} /></div>
            </article>
            <article className="telemetry-card">
              <div className="telemetry-card__label"><ScanEye size={15} aria-hidden="true" />PERCLOS</div>
              <div className="telemetry-card__value"><strong>{sample.perclos}</strong><span>%</span></div>
              <small>60-second window</small>
            </article>
            <article className="telemetry-card">
              <div className="telemetry-card__label"><Eye size={15} aria-hidden="true" />Blink rate</div>
              <div className="telemetry-card__value"><strong>{sample.blinkRate}</strong><span>/ min</span></div>
              <small>Simulated cadence</small>
            </article>
            <article className="telemetry-card">
              <div className="telemetry-card__label"><TimerReset size={15} aria-hidden="true" />Eye closure</div>
              <div className="telemetry-card__value"><strong>{sample.closureMs}</strong><span>ms</span></div>
              <small>Latest duration</small>
            </article>
            <article className="telemetry-card">
              <div className="telemetry-card__label"><Move3d size={15} aria-hidden="true" />Head pose</div>
              <div className="pose-values"><span>Pitch <strong>{sample.pitch}°</strong></span><span>Yaw <strong>{sample.yaw}°</strong></span></div>
            </article>
            <article className="telemetry-card">
              <div className="telemetry-card__label"><Camera size={15} aria-hidden="true" />Signal</div>
              <div className="telemetry-card__value"><strong>{sample.quality}</strong><span>%</span></div>
              <small>Quality estimate</small>
            </article>
            <article className="telemetry-card">
              <div className="telemetry-card__label"><Activity size={15} aria-hidden="true" />Frame rate</div>
              <div className="telemetry-card__value"><strong>{sample.fps}</strong><span>fps</span></div>
              <small>Mock processing</small>
            </article>
          </div>
        </aside>

        <article className="panel drive-signal-panel">
          <div className="panel__heading">
            <div><p className="section-kicker">Latest 60 samples</p><h2>Risk over time</h2></div>
            <StatusBadge label={`${sample.quality}% signal`} tone="aqua" />
          </div>
          <SignalChart samples={chartSamples} compact />
        </article>

        <article className="panel drive-events-panel">
          <div className="panel__heading">
            <div><p className="section-kicker">Bounded local log</p><h2>Session events</h2></div>
            <span className="panel__count">{String(state.events.length).padStart(2, '0')}</span>
          </div>
          <EventTimeline events={state.events} />
        </article>

        <DemoControls onNormal={onNormal} onWarning={onWarning} onCritical={onCritical} onEnd={onEnd} />
      </div>
    </div>
  )
}
