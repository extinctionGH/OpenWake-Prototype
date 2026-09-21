import { AlertTriangle, CheckCircle2, Info, Siren } from 'lucide-react'
import type { SessionEvent } from '../demo/demoTypes'

type EventTimelineProps = {
  events: SessionEvent[]
  emptyLabel?: string
}

const formatEventTime = (timestampMs: number) => {
  if (timestampMs <= 0) return 'Just now'
  const minutes = Math.floor(timestampMs / 60_000)
  const seconds = Math.floor((timestampMs % 60_000) / 1000)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function EventTimeline({ events, emptyLabel = 'No demo events yet' }: EventTimelineProps) {
  if (events.length === 0) return <p className="empty-state">{emptyLabel}</p>

  return (
    <ol className="event-timeline">
      {events.map((event) => {
        const EventIcon = event.severity === 'critical' ? Siren : event.severity === 'warning' ? AlertTriangle : event.label.includes('ready') ? CheckCircle2 : Info
        return (
          <li className={`event-item event-item--${event.severity}`} key={event.id}>
            <span className="event-item__icon" aria-hidden="true"><EventIcon size={15} strokeWidth={1.9} /></span>
            <span className="event-item__content">
              <strong>{event.label}</strong>
              <span>{event.severity === 'info' ? 'System event' : `${event.severity} state`}</span>
            </span>
            <time>{formatEventTime(event.timestampMs)}</time>
          </li>
        )
      })}
    </ol>
  )
}
