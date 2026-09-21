import { useReducer } from 'react'
import { AppShell } from './components/AppShell'
import { demoReducer, initialDemoState } from './demo/demoReducer'
import type { AppView } from './demo/demoTypes'
import { OverviewView } from './views/OverviewView'
import { CalibrationView } from './views/CalibrationView'
import { DriveView } from './views/DriveView'
import { SummaryView } from './views/SummaryView'

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
      {state.view === 'overview' ? (
        <OverviewView
          events={state.events}
          onStartCalibration={() => dispatch({ type: 'START_CALIBRATION' })}
          onReplay={() => dispatch({ type: 'RESET_DEMO' })}
        />
      ) : state.view === 'calibration' ? (
        <CalibrationView
          stage={state.calibrationStage}
          progress={state.calibrationProgress}
          onStartBaseline={() => dispatch({ type: 'START_BASELINE' })}
          onSetProgress={(progress) => dispatch({ type: 'SET_CALIBRATION_PROGRESS', progress })}
          onComplete={() => dispatch({ type: 'COMPLETE_CALIBRATION' })}
          onEnterDrive={() => dispatch({ type: 'ENTER_DRIVE_MODE' })}
        />
      ) : state.view === 'drive' ? (
        <DriveView
          state={state}
          onTick={(elapsedMs) => dispatch({ type: 'TICK', elapsedMs })}
          onWarning={() => dispatch({ type: 'SIMULATE_WARNING' })}
          onCritical={() => dispatch({ type: 'SIMULATE_CRITICAL' })}
          onNormal={() => dispatch({ type: 'RESTORE_NORMAL' })}
          onEnd={() => dispatch({ type: 'END_SESSION' })}
          onAcknowledge={() => dispatch({ type: 'ACKNOWLEDGE_ALERT' })}
        />
      ) : state.view === 'summary' ? (
        <SummaryView
          state={state}
          onReplay={() => dispatch({ type: 'RESET_DEMO' })}
          onReturn={() => dispatch({ type: 'RESET_DEMO' })}
        />
      ) : (
        <section className="view-placeholder" aria-labelledby="view-title">
          <p className="eyebrow">OpenWake / {state.view}</p>
          <h1 id="view-title">This demo stage is loading next.</h1>
          <p>Each signal in this experience is deterministic and simulated locally.</p>
        </section>
      )}
    </AppShell>
  )
}
