import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CalibrationView } from './CalibrationView'

const baseProps = {
  progress: 0,
  onStartBaseline: vi.fn(),
  onSetProgress: vi.fn(),
  onComplete: vi.fn(),
  onEnterDrive: vi.fn(),
}

describe('CalibrationView', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.values(baseProps).forEach((value) => {
      if (typeof value === 'function') value.mockClear()
    })
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('runs five placement checks in a fixed sequence before baseline can start', () => {
    render(<CalibrationView {...baseProps} stage="position" />)

    fireEvent.click(screen.getByRole('button', { name: 'Run placement check' }))
    expect(screen.getByText('Checking placement')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(1_500))

    expect(screen.getAllByText('Passed')).toHaveLength(5)
    fireEvent.click(screen.getByRole('button', { name: 'Start anonymous baseline' }))
    expect(baseProps.onStartBaseline).toHaveBeenCalledTimes(1)
  })

  it('completes baseline progress once after approximately four seconds', () => {
    render(<CalibrationView {...baseProps} stage="baseline" />)

    act(() => vi.advanceTimersByTime(4_200))

    expect(baseProps.onSetProgress).toHaveBeenLastCalledWith(100)
    expect(baseProps.onComplete).toHaveBeenCalledTimes(1)
  })

  it('skips to exactly the ready state and enters Drive Mode', () => {
    const { rerender } = render(<CalibrationView {...baseProps} stage="position" />)

    fireEvent.click(screen.getByRole('button', { name: 'Skip to ready' }))
    expect(baseProps.onComplete).toHaveBeenCalledTimes(1)

    rerender(<CalibrationView {...baseProps} stage="ready" progress={100} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Enter Drive Mode' }))
    expect(baseProps.onEnterDrive).toHaveBeenCalledTimes(1)
  })

  it('completes baseline immediately for reduced-motion users', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    render(<CalibrationView {...baseProps} stage="baseline" />)

    expect(baseProps.onSetProgress).toHaveBeenCalledWith(100)
    expect(baseProps.onComplete).toHaveBeenCalledTimes(1)
  })
})
