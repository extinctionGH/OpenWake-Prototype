import { Activity, AlertTriangle, ArrowLeft, CheckCircle2, Clock3, Gauge, RotateCcw, ShieldCheck, Siren, TimerReset } from 'lucide-react'
import { EventTimeline } from '../components/EventTimeline'
import { SignalChart } from '../components/SignalChart'
import { StatusBadge } from '../components/StatusBadge'
import { sampleForState, summarizeSession } from '../demo/demoTelemetry'
import type { DemoState } from '../demo/demoTypes'

type SummaryViewProps = {
  state: DemoState
  onReplay: () => void
  onReturn: () => void
}

const formatDuration = (durationMs: number) => {
  const totalSeconds = Math.floor(durationMs / 1000)
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`
}

export function SummaryView({ state, onReplay, onReturn }: SummaryViewProps) {
  const summary = summarizeSession(state)
  const chartSamples = state.telemetry.length > 1
    ? state.telemetry
    : [sampleForState('attentive', 0), sampleForState('attentive', 1000)]
  const chronologicalEvents = [...state.events].sort((a, b) => a.timestampMs - b.timestampMs)

  const metrics = [
    { label: 'Session duration', value: formatDuration(summary.durationMs), detail: 'mm:ss', icon: Clock3, tone: 'aqua' },
    { label: 'Average fatigue', value: `${summary.averageFatigueRisk} / 100`, detail: 'Simulated index', icon: Gauge, tone: 'aqua' },
    { label: 'Warnings', value: String(summary.warningCount).padStart(2, '0'), detail: 'Caution events', icon: AlertTriangle, tone: 'warning' },
    { label: 'Critical events', value: String(summary.criticalCount).padStart(2, '0'), detail: 'Escalated events', icon: Siren, tone: summary.criticalCount ? 'danger' : 'neutral' },
    { label: 'Longest eye closure', value: `${(summary.longestClosureMs / 1000).toFixed(1)} s`, detail: 'Simulated duration', icon: TimerReset, tone: 'neutral' },
    { label: 'Signal quality', value: `${summary.signalQuality}%`, detail: 'Average estimate', icon: Activity, tone: 'success' },
  ] as const

  return (
    <div className="summary-view">
      <section className="summary-hero" aria-labelledby="summary-title">
        <div className="summary-hero__icon" aria-hidden="true"><CheckCircle2 size={25} /></div>
        <div className="summary-hero__copy">
          <div><p className="eyebrow">Demo session / Complete</p><StatusBadge label="Local summary only" tone="success" icon={ShieldCheck} /></div>
          <h1 id="summary-title">Session complete.</h1>
          <p>The timeline explains the simulated escalation without storing camera footage, facial identity, or biometric data.</p>
        </div>
        <div className="summary-hero__actions">
          <button className="button button--primary" type="button" onClick={onReplay}><RotateCcw size={16} />Replay demo</button>
          <button className="button button--quiet" type="button" onClick={onReturn}><ArrowLeft size={16} />Return to overview</button>
        </div>
      </section>

      <section className="summary-metrics" aria-label="Session summary metrics">
        {metrics.map(({ label, value, detail, icon: Icon, tone }) => (
          <article className={`summary-metric summary-metric--${tone}`} key={label}>
            <span className="summary-metric__icon" aria-hidden="true"><Icon size={16} /></span>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </section>

      <div className="summary-grid">
        <article className="panel summary-chart-panel">
          <div className="panel__heading">
            <div><p className="section-kicker">Session trace</p><h2>Risk over time</h2></div>
            <StatusBadge label={`${summary.signalQuality}% avg. signal`} tone="aqua" />
          </div>
          <SignalChart samples={chartSamples} />
        </article>

        <article className="panel summary-events-panel">
          <div className="panel__heading">
            <div><p className="section-kicker">Explainable output</p><h2>Chronological events</h2></div>
            <span className="panel__count">{String(chronologicalEvents.length).padStart(2, '0')}</span>
          </div>
          <EventTimeline events={chronologicalEvents} emptyLabel="No alert events occurred in this demo." />
        </article>
      </div>
    </div>
  )
}
