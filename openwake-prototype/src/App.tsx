import { useReducer } from 'react'
import { AppShell } from './components/AppShell'
import { demoReducer, initialDemoState } from './demo/demoReducer'
import type { AppView } from './demo/demoTypes'

export default function App() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState)

  const navigate = (view: AppView) => {
    if (view === 'overview') dispatch({ type: 'RESET_DEMO' })
    if (view === 'calibration') dispatch({ type: 'START_CALIBRATION' })
    if (view === 'drive') dispatch({ type: 'ENTER_DRIVE_MODE' })
    if (view === 'summary') dispatch({ type: 'END_SESSION' })
  }

  return (
    <AppShell
      currentView={state.view}
      canEnterDrive={state.calibrationStage === 'ready'}
      canViewSummary={state.view === 'summary'}
      onNavigate={navigate}
    >
      <section className="view-placeholder" aria-labelledby="view-title">
        <p className="eyebrow">OpenWake / {state.view}</p>
        <h1 id="view-title">Driver awareness, presented clearly.</h1>
        <p>Each signal in this experience is deterministic and simulated locally.</p>
        <button className="button button--primary" type="button" onClick={() => dispatch({ type: 'START_CALIBRATION' })}>
          Start calibration
        </button>
      </section>
    </AppShell>
  )
}
