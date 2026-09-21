import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { initialDemoState } from '../demo/demoReducer'
import { sampleForState } from '../demo/demoTelemetry'
import type { DemoState } from '../demo/demoTypes'
import { SummaryView } from './SummaryView'

const summaryState: DemoState = {
  ...initialDemoState,
  view: 'summary',
  elapsedMs: 155_000,
  warningCount: 2,
  criticalCount: 1,
  telemetry: [
    { ...sampleForState('attentive', 10_000), fatigueRisk: 20, closureMs: 180, quality: 96 },
    { ...sampleForState('caution', 20_000), fatigueRisk: 50, closureMs: 760, quality: 92 },
    { ...sampleForState('critical', 30_000), fatigueRisk: 80, closureMs: 1_800, quality: 88 },
  ],
  events: [
    { id: 'event-2-warning', timestampMs: 20_000, severity: 'warning', label: 'Possible fatigue pattern' },
    { id: 'event-1-start', timestampMs: 0, severity: 'info', label: 'Drive Mode started' },
    { id: 'event-3-critical', timestampMs: 30_000, severity: 'critical', label: 'Prolonged eye closure simulated' },
  ],
}

describe('SummaryView', () => {
  it('renders calculated session metrics and chronological events', () => {
    render(<SummaryView state={summaryState} onReplay={vi.fn()} onReturn={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'Session complete.' })).toBeInTheDocument()
    expect(screen.getByText('02:35')).toBeInTheDocument()
    expect(screen.getByText('50 / 100')).toBeInTheDocument()
    expect(screen.getByText('1.8 s')).toBeInTheDocument()
    expect(screen.getByText('92%')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /risk and signal quality/i })).toBeInTheDocument()

    const eventLabels = screen.getAllByRole('listitem').map((item) => item.textContent)
    expect(eventLabels[0]).toContain('Drive Mode started')
    expect(eventLabels[2]).toContain('Prolonged eye closure simulated')
  })

  it('exposes reliable replay and overview reset actions', () => {
    const onReplay = vi.fn()
    const onReturn = vi.fn()
    render(<SummaryView state={summaryState} onReplay={onReplay} onReturn={onReturn} />)

    fireEvent.click(screen.getByRole('button', { name: 'Replay demo' }))
    fireEvent.click(screen.getByRole('button', { name: 'Return to overview' }))

    expect(onReplay).toHaveBeenCalledTimes(1)
    expect(onReturn).toHaveBeenCalledTimes(1)
  })
})
