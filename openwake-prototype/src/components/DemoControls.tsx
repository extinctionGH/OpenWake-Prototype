import { AlertTriangle, CircleStop, RotateCcw, Siren } from 'lucide-react'

type DemoControlsProps = {
  onNormal: () => void
  onWarning: () => void
  onCritical: () => void
  onEnd: () => void
}

export function DemoControls({ onNormal, onWarning, onCritical, onEnd }: DemoControlsProps) {
  return (
    <section className="demo-controls" aria-labelledby="demo-controls-title">
      <div className="demo-controls__heading">
        <div>
          <p className="section-kicker">Presentation only</p>
          <h2 id="demo-controls-title">Demo controls</h2>
        </div>
        <span>Manual simulation</span>
      </div>
      <div className="demo-controls__grid">
        <button className="demo-control demo-control--normal" type="button" onClick={onNormal} aria-label="Normal">
          <RotateCcw size={16} aria-hidden="true" /><span><strong>Normal</strong><small>Restore attentive</small></span>
        </button>
        <button className="demo-control demo-control--warning" type="button" onClick={onWarning} aria-label="Simulate warning">
          <AlertTriangle size={16} aria-hidden="true" /><span><strong>Simulate warning</strong><small>Caution pattern</small></span>
        </button>
        <button className="demo-control demo-control--critical" type="button" onClick={onCritical} aria-label="Simulate critical">
          <Siren size={16} aria-hidden="true" /><span><strong>Simulate critical</strong><small>Escalated alert</small></span>
        </button>
        <button className="demo-control demo-control--end" type="button" onClick={onEnd} aria-label="End session">
          <CircleStop size={16} aria-hidden="true" /><span><strong>End session</strong><small>Open summary</small></span>
        </button>
      </div>
    </section>
  )
}
