import type { LucideIcon } from 'lucide-react'

type StatusBadgeProps = {
  label: string
  tone?: 'aqua' | 'success' | 'warning' | 'danger' | 'neutral'
  icon?: LucideIcon
  pulse?: boolean
}

export function StatusBadge({ label, tone = 'neutral', icon: Icon, pulse = false }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${tone}`}>
      {Icon ? <Icon size={14} strokeWidth={2} aria-hidden="true" /> : <span className={pulse ? 'status-dot status-dot--pulse' : 'status-dot'} aria-hidden="true" />}
      {label}
    </span>
  )
}
