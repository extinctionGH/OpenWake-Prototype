import { BellRing, Droplets, Lightbulb, PowerOff, RadioTower } from 'lucide-react'
import { StatusBadge } from './StatusBadge'

export function FutureAccessoryCard() {
  return (
    <article className="panel accessory-card">
      <div className="panel__heading">
        <div><p className="section-kicker">Intervention outputs</p><h2>Wake intervention</h2></div>
        <RadioTower size={19} aria-hidden="true" />
      </div>
      <div className="output-row"><Droplets size={19} aria-hidden="true" /><div><strong>Water spray</strong><span>Primary · Servo-actuated trigger bottle</span></div><StatusBadge label="Not connected" tone="neutral" /></div>
      <div className="output-row"><BellRing size={19} aria-hidden="true" /><div><strong>Buzzer</strong><span>Additional / backup audible alert</span></div><StatusBadge label="Not connected" tone="neutral" /></div>
      <div className="output-row"><Lightbulb size={19} aria-hidden="true" /><div><strong>Status LED</strong><span>Additional / backup visual alert</span></div><StatusBadge label="Not connected" tone="neutral" /></div>
      <div className="accessory-card__link"><span>Proposed controller link</span><strong>ESP32 · Local Wi-Fi / USB</strong></div>
      <p className="output-note">One bounded press/release per fresh event. Valid recovery and a new event rearm the spray. Startup, calibration and unavailable tracking inhibit actuation.</p>
      <div className="output-note output-disabled"><PowerOff size={15} aria-hidden="true" /><span>Spray disabled · Manual enable/stop planned for the physical rig.</span></div>
    </article>
  )
}
