import { Activity, ArrowRight, Camera, CircleGauge, Cpu, RotateCcw, ShieldCheck } from 'lucide-react'
import { EventTimeline } from '../components/EventTimeline'
import { CameraSimulator } from '../components/CameraSimulator'
import { FutureAccessoryCard } from '../components/FutureAccessoryCard'
import { MetricCard } from '../components/MetricCard'
import { SignalChart } from '../components/SignalChart'
import { StatusBadge } from '../components/StatusBadge'
import { sampleForState } from '../demo/demoTelemetry'
import type { SessionEvent } from '../demo/demoTypes'

type OverviewViewProps = {
  events: SessionEvent[]
  onStartCalibration: () => void
  onReplay: () => void
}

const overviewSamples = Array.from({ length: 60 }, (_, index) => {
  const second = index + 1
  const state = second > 39 && second < 48 ? 'caution' : 'attentive'
  return sampleForState(state, second * 1000)
})

export function OverviewView({ events, onStartCalibration, onReplay }: OverviewViewProps) {
  return (
    <div className="overview-view">
      <section className="overview-hero" aria-labelledby="overview-title">
        <div className="overview-hero__copy">
          <div className="overview-hero__meta">
            <p className="eyebrow">Driver workspace</p>
          </div>
          <h1 id="overview-title">Overview</h1>
          <p>Driver observations, calibration readiness and intervention status.</p>
          <div className="overview-hero__actions">
            <button className="button button--primary" type="button" onClick={onStartCalibration}>
              Start calibration <ArrowRight size={17} aria-hidden="true" />
            </button>
            <button className="button button--quiet" type="button" onClick={onReplay}>
              <RotateCcw size={15} aria-hidden="true" /> Replay demo
            </button>
          </div>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Simulated readiness metrics">
        <MetricCard label="Readiness" value="Ready" detail="Calibration available" icon={ShieldCheck} tone="success" />
        <MetricCard label="Fatigue index" value="18 / 100" detail="Low simulated risk" icon={CircleGauge} tone="aqua" />
        <MetricCard label="Camera quality" value="96%" detail="Simulated signal" icon={Camera} tone="aqua" />
        <MetricCard label="Intervention" value="Disconnected" detail="Spray, buzzer and LED" icon={Cpu} />
      </section>

      <section className="overview-dashboard">
        <article className="panel overview-camera-panel">
          <div className="panel__heading"><div><h2>Driver observation</h2><p className="panel-subtitle">CAM-01 · Reference view</p></div><StatusBadge label="Not connected" tone="neutral" /></div>
          <CameraSimulator status="aligned" />
          <div className="signal-panel__footer"><span>Example eye landmarks</span><span>Calibration required before a session</span></div>
        </article>
        <article className="panel signal-panel">
          <div className="panel__heading">
            <div>
              <p className="section-kicker">Deterministic preview</p>
              <h2>60-second signal</h2>
            </div>
            <div className="chart-legend" aria-hidden="true">
              <span><i className="chart-legend__aqua" />Fatigue risk</span>
              <span><i className="chart-legend__muted" />Signal quality</span>
            </div>
          </div>
          <SignalChart samples={overviewSamples} />
          <div className="signal-panel__footer">
            <span><Activity size={14} aria-hidden="true" /> Stable demo profile</span>
            <span>Data stays on this device</span>
          </div>
        </article>

        <article className="panel events-panel">
          <div className="panel__heading">
            <div>
              <p className="section-kicker">Local log</p>
              <h2>Recent events</h2>
            </div>
            <span className="panel__count">{String(events.length).padStart(2, '0')}</span>
          </div>
          <EventTimeline events={events.slice(-3)} />
        </article>

        <FutureAccessoryCard />
      </section>
    </div>
  )
}
