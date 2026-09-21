import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CriticalAlert } from './CriticalAlert'

function AlertHarness() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Simulate critical</button>
      {open && <CriticalAlert onAcknowledge={() => setOpen(false)} />}
    </>
  )
}

describe('CriticalAlert', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('opens as an alert dialog and moves focus to acknowledgement', () => {
    render(<AlertHarness />)
    fireEvent.click(screen.getByRole('button', { name: 'Simulate critical' }))

    expect(screen.getByRole('alertdialog', { name: 'WAKE NOW' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Acknowledge alert' })).toHaveFocus()
  })

  it('acknowledges with Escape and returns focus to the trigger', () => {
    render(<AlertHarness />)
    const trigger = screen.getByRole('button', { name: 'Simulate critical' })
    trigger.focus()
    fireEvent.click(trigger)

    fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' })

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('acknowledges with the explicit button and returns focus', () => {
    render(<AlertHarness />)
    const trigger = screen.getByRole('button', { name: 'Simulate critical' })
    trigger.focus()
    fireEvent.click(trigger)
    fireEvent.click(screen.getByRole('button', { name: 'Acknowledge alert' }))

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('marks the alert as static when reduced motion is preferred', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    render(<CriticalAlert onAcknowledge={vi.fn()} />)

    expect(screen.getByRole('alertdialog')).toHaveClass('critical-alert--reduced-motion')
  })
})
