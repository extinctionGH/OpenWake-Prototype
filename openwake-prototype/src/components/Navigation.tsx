import { Activity, Gauge, LayoutDashboard, ScanFace } from 'lucide-react'
import type { AppView } from '../demo/demoTypes'

type NavigationProps = {
  currentView: AppView
  canEnterDrive: boolean
  canViewSummary: boolean
  onNavigate: (view: AppView) => void
  variant: 'sidebar' | 'bottom'
}

const navigationItems = [
  { view: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
  { view: 'calibration' as const, label: 'Calibration', icon: ScanFace },
  { view: 'drive' as const, label: 'Drive', icon: Gauge },
  { view: 'summary' as const, label: 'Summary', icon: Activity },
]

export function Navigation({ currentView, canEnterDrive, canViewSummary, onNavigate, variant }: NavigationProps) {
  return (
    <nav className={`navigation navigation--${variant}`} aria-label="Prototype views">
      {navigationItems.map(({ view, label, icon: Icon }) => {
        const disabled = (view === 'drive' && !canEnterDrive) || (view === 'summary' && !canViewSummary)
        const isCurrent = currentView === view

        return (
          <button
            className="navigation__item"
            type="button"
            key={view}
            onClick={() => onNavigate(view)}
            disabled={disabled}
            aria-current={isCurrent ? 'page' : undefined}
            aria-label={`${label}${isCurrent ? ', current view' : ''}${disabled ? ', unavailable' : ''}`}
          >
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
