import { useReducer } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { demoReducer, initialDemoState } from '../demo/demoReducer'
import type { DemoState } from '../demo/demoTypes'
import { DriveView } from './DriveView'

const driveState: DemoState = {
  ...initialDemoState,
  view: 'drive',
  calibrationStage: 'ready',
  events: [],
}

function DriveHarness() {
  const [state, dispatch] = useReducer(demoReducer, driveState)
  if (state.view === 'summary') return <h1>Session summary</h1>
  return (
    <DriveView
      state={state}
      onTick={(elapsedMs) => dispatch({ type: 'TICK', elapsedMs })}
      onWarning={() => dispatch({ type: 'SIMULATE_WARNING' })}
      onCritical={() => dispatch({ type: 'SIMULATE_CRITICAL' })}
      onNormal={() => dispatch({ type: 'RESTORE_NORMAL' })}
      onEnd={() => dispatch({ type: 'END_SESSION' })}
      onAcknowledge={() => dispatch({ type: 'ACKNOWLEDGE_ALERT' })}
    />
  )
}

describe('DriveView', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('updates elapsed time once per second with a single timer', () => {
    render(<DriveHarness />)

    act(() => vi.advanceTimersByTime(2_100))

    expect(screen.getByTestId('session-duration')).toHaveTextContent('00:02')
    expect(screen.getByTestId('sample-count')).toHaveTextContent('2 samples')
  })

  it('makes warning, critical, and restored states immediately readable', () => {
    render(<DriveHarness />)

    fireEvent.click(screen.getByRole('button', { name: 'Simulate warning' }))
    expect(screen.getByRole('status')).toHaveTextContent('CAUTION')

    fireEvent.click(screen.getByRole('button', { name: 'Simulate critical' }))
    expect(screen.getByRole('status')).toHaveTextContent('WAKE NOW')

    fireEvent.click(screen.getByRole('button', { name: 'Normal' }))
    expect(screen.getByRole('status')).toHaveTextContent('ATTENTIVE')
  })

  it('keeps the visible event timeline bounded to six items', () => {
    render(<DriveHarness />)

    for (let index = 0; index < 8; index += 1) {
      fireEvent.click(screen.getByRole('button', { name: 'Simulate warning' }))
      fireEvent.click(screen.getByRole('button', { name: 'Normal' }))
    }

    expect(screen.getAllByRole('listitem')).toHaveLength(6)
  })

  it('ends the demo session into Summary', () => {
    render(<DriveHarness />)
    fireEvent.click(screen.getByRole('button', { name: 'End session' }))
    expect(screen.getByRole('heading', { name: 'Session summary' })).toBeInTheDocument()
  })
})
