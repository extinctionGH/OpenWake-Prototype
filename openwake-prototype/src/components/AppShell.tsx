import { useEffect, useState, type ReactNode } from 'react'
import { Eye, HardDrive, Moon, Sun } from 'lucide-react'
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try { return localStorage.getItem('openwake:theme') === 'dark' ? 'dark' : 'light' } catch { return 'light' }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('openwake:theme', theme) } catch { /* Appearance remains usable without storage. */ }
  }, [theme])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <div className="workspace-identity">
          <button className="brand" type="button" onClick={() => onNavigate('overview')} aria-label="OpenWake overview">
            <span className="brand__mark" aria-hidden="true"><Eye size={21} strokeWidth={1.8} /></span>
            <span className="brand__name">OpenWake</span>
          </button>
          <span className="workspace-divider" aria-hidden="true">/</span>
          <span className="workspace-name">Driver workspace</span>
          <span className="workspace-local">Local workspace</span>
        </div>
        <div className="topbar__status">
          <StatusBadge label="Preview data" tone="neutral" />
          <button className="icon-button" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <span className="workspace-avatar" aria-label="Local operator">LM</span>
        </div>
      </header>
      <Navigation currentView={currentView} canEnterDrive={canEnterDrive} canViewSummary={canViewSummary} onNavigate={onNavigate} variant="top" />
      <main id="main-content" className="app-main" tabIndex={-1}>{children}</main>
      <footer className="app-footer">
        <span><HardDrive size={14} aria-hidden="true" />Local preview · No hardware connected</span>
        <span>Simulated observations · No camera access</span>
        <span>Does not detect real fatigue. Do not use while driving.</span>
      </footer>
    </div>
  )
}
