import { Bluetooth, LockKeyhole, PowerOff, RadioTower, ShieldCheck } from 'lucide-react'
import { StatusBadge } from './StatusBadge'

const safeguards = [
  { label: 'Paired device', icon: Bluetooth },
  { label: 'Authenticated commands', icon: LockKeyhole },
  { label: 'Manual arm + cooldown', icon: ShieldCheck },
  { label: 'Physical disable switch', icon: PowerOff },
]

export function FutureAccessoryCard() {
  return (
    <article className="panel accessory-card">
      <div className="panel__heading">
        <div>
          <p className="section-kicker">Engineering readiness</p>
          <h2>Future wake accessory</h2>
        </div>
        <RadioTower size={20} strokeWidth={1.6} aria-hidden="true" />
      </div>
      <StatusBadge label="Simulator only · Hardware disconnected" tone="neutral" />
      <div className="accessory-card__link">
        <span>Planned link</span>
        <strong>Bluetooth Low Energy</strong>
      </div>
      <ul className="safeguard-list">
        {safeguards.map(({ label, icon: Icon }) => (
          <li key={label}><Icon size={14} aria-hidden="true" />{label}</li>
        ))}
      </ul>
      <button className="button accessory-card__button" type="button" disabled>
        <PowerOff size={15} aria-hidden="true" />
        Physical output unavailable in prototype
      </button>
    </article>
  )
}
