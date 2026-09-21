import { useEffect, useRef } from 'react'
import { BellRing, Check, Volume2, Waves } from 'lucide-react'

type CriticalAlertProps = {
  onAcknowledge: () => void
}

export function CriticalAlert({ onAcknowledge }: CriticalAlertProps) {
  const acknowledgeRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
    acknowledgeRef.current?.focus()
    return () => returnFocusTo?.focus()
  }, [])

  return (
    <div className="critical-alert-backdrop">
      <section
        className={reducedMotion ? 'critical-alert critical-alert--reduced-motion' : 'critical-alert'}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="critical-alert-title"
        aria-describedby="critical-alert-description"
        onKeyDown={(event) => {
          if (event.key === 'Escape') onAcknowledge()
        }}
      >
        <div className="critical-alert__signal" aria-hidden="true">
          <span /><span /><span />
          <BellRing size={27} strokeWidth={1.8} />
        </div>
        <p className="critical-alert__kicker">Critical simulation</p>
        <h2 id="critical-alert-title">WAKE NOW</h2>
        <p id="critical-alert-description">Prolonged eye closure simulated</p>

        <div className="critical-alert__indicators">
          <span><Waves size={15} aria-hidden="true" />Visual vibration</span>
          <span><Volume2 size={15} aria-hidden="true" />Demo tone · Optional</span>
        </div>

        <button ref={acknowledgeRef} className="button critical-alert__acknowledge" type="button" onClick={onAcknowledge}>
          <Check size={17} aria-hidden="true" /> Acknowledge alert
        </button>
        <small>Press Escape or acknowledge to return to caution.</small>
      </section>
    </div>
  )
}
