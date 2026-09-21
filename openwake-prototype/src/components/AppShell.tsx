import type { ReactNode } from 'react'
import { Eye, Radio, Shield } from 'lucide-react'
import type { AppView } from '../demo/demoTypes'
import { Navigation } from './Navigation'
import { StatusBadge } from './StatusBadge'

type AppShellProps = {
  currentView: AppView
  canEnterDrive: boolean
  canViewSummary: boolean
  onNavigate: (view: AppView) => void
  children: ReactNode
}

export function AppShell({ currentView, canEnterDrive, canViewSummary, onNavigate, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand" aria-label="OpenWake home">
          <span className="brand__mark" aria-hidden="true"><Eye size={21} strokeWidth={1.8} /></span>
          <span className="brand__name">OpenWake</span>
        </div>
        <div className="sidebar__section-label">Monitor</div>
        <Navigation
          currentView={currentView}
          canEnterDrive={canEnterDrive}
          canViewSummary={canViewSummary}
          onNavigate={onNavigate}
          variant="sidebar"
        />
        <div className="sidebar__system">
          <p>System status</p>
          <StatusBadge label="Prototype online" tone="success" pulse />
          <span>Local simulation</span>
        </div>
      </aside>

      <div className="app-shell__body">
        <header className="topbar">
          <div className="topbar__brand brand">
            <span className="brand__mark" aria-hidden="true"><Eye size={19} strokeWidth={1.8} /></span>
            <span className="brand__name">OpenWake</span>
          </div>
          <div className="topbar__status">
            <StatusBadge label="Interactive prototype · Simulated data" tone="aqua" icon={Shield} />
            <StatusBadge label="Online" tone="success" icon={Radio} />
          </div>
        </header>

        <main className="app-main">{children}</main>

        <footer className="app-footer">
          OpenWake is a presentation prototype. It does not detect real fatigue and must not be used while driving.
        </footer>

        <Navigation
          currentView={currentView}
          canEnterDrive={canEnterDrive}
          canViewSummary={canViewSummary}
          onNavigate={onNavigate}
          variant="bottom"
        />
      </div>
    </div>
  )
}
