import type { LucideIcon } from 'lucide-react'

type MetricCardProps = {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  tone?: 'aqua' | 'success' | 'warning' | 'neutral'
}

export function MetricCard({ label, value, detail, icon: Icon, tone = 'neutral' }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <div className="metric-card__topline">
        <span>{label}</span>
        <span className="metric-card__icon" aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>
      </div>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  )
}
