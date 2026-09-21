import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, ChevronRight, Circle, FastForward, Lightbulb, Ruler, ScanFace, Smartphone, SunMedium } from 'lucide-react'
import { CameraSimulator } from '../components/CameraSimulator'
import { StatusBadge } from '../components/StatusBadge'
import type { CalibrationStage } from '../demo/demoTypes'

type CalibrationViewProps = {
  stage: CalibrationStage
  progress: number
  onStartBaseline: () => void
  onSetProgress: (progress: number) => void
  onComplete: () => void
  onEnterDrive: () => void
}

const placementChecks = [
  { label: 'Face centered', detail: 'Inside alignment guide', icon: ScanFace },
  { label: 'Camera angle', detail: 'Dashboard-level position', icon: Smartphone },
  { label: 'Lighting', detail: 'Even simulated exposure', icon: SunMedium },
  { label: 'Eyes visible', detail: 'Landmarks unobstructed', icon: Lightbulb },
  { label: 'Distance', detail: 'Approx. 50–70 cm', icon: Ruler },
]

export function CalibrationView({
  stage,
  progress,
  onStartBaseline,
  onSetProgress,
  onComplete,
  onEnterDrive,
}: CalibrationViewProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [checksPassed, setChecksPassed] = useState(0)
  const callbacksRef = useRef({ onSetProgress, onComplete })
  callbacksRef.current = { onSetProgress, onComplete }

  useEffect(() => {
    if (!isChecking) return
    let completedChecks = 0
    const interval = window.setInterval(() => {
      completedChecks += 1
      setChecksPassed(completedChecks)
      if (completedChecks === placementChecks.length) {
        window.clearInterval(interval)
        setIsChecking(false)
      }
    }, 240)
    return () => window.clearInterval(interval)
  }, [isChecking])

  useEffect(() => {
    if (stage !== 'baseline') return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      callbacksRef.current.onSetProgress(100)
      callbacksRef.current.onComplete()
      return
    }

    let currentProgress = progress
    let completed = false
    const interval = window.setInterval(() => {
      currentProgress = Math.min(100, currentProgress + 5)
      callbacksRef.current.onSetProgress(currentProgress)
      if (currentProgress === 100 && !completed) {
        completed = true
        window.clearInterval(interval)
        callbacksRef.current.onComplete()
      }
    }, 200)

    return () => window.clearInterval(interval)
  }, [stage])

  const checkComplete = checksPassed === placementChecks.length
  const stageNumber = stage === 'position' ? '01' : stage === 'baseline' ? '02' : '03'

  return (
    <div className="calibration-view">
      <header className="view-header">
        <div>
          <p className="eyebrow">Calibration / {stageNumber}</p>
          <h1>{stage === 'position' ? 'Position the phone.' : stage === 'baseline' ? 'Capture a baseline.' : 'Baseline ready.'}</h1>
          <p>{stage === 'position' ? 'Check the simulated field of view before capturing an anonymous baseline.' : stage === 'baseline' ? 'OpenWake is generating a deterministic reference profile. No biometric data is created.' : 'The simulated placement and baseline checks are complete.'}</p>
        </div>
        <StatusBadge label="No camera permission" tone="aqua" />
      </header>

      <div className="calibration-layout">
        <section className="calibration-camera-panel" aria-label="Simulated positioning viewport">
          <CameraSimulator status={stage === 'ready' || checkComplete ? 'aligned' : 'searching'} />
          {stage === 'baseline' && (
            <div className="calibration-progress" aria-label={`Baseline ${progress}% complete`}>
              <div className="calibration-progress__topline">
                <span>Anonymous baseline</span><strong>{progress}%</strong>
              </div>
              <div className="progress-track"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
              <p>Sampling simulated eye-open timing and neutral head pose.</p>
            </div>
          )}
          {stage === 'ready' && (
            <div className="calibration-ready-card">
              <span className="calibration-ready-card__icon"><Check size={18} aria-hidden="true" /></span>
              <div><strong>Reference profile prepared</strong><span>Deterministic demo baseline</span></div>
              <b>100%</b>
            </div>
          )}
        </section>

        <aside className="calibration-rail panel">
          <div className="calibration-steps" aria-label="Calibration stages">
            {['Position', 'Baseline', 'Ready'].map((label, index) => {
              const currentIndex = stage === 'position' ? 0 : stage === 'baseline' ? 1 : 2
              return (
                <div className={index <= currentIndex ? 'calibration-step calibration-step--active' : 'calibration-step'} key={label}>
                  <span>{index < currentIndex ? <Check size={13} /> : `0${index + 1}`}</span>{label}
                </div>
              )
            })}
          </div>

          <div className="placement-list" aria-live="polite">
            {placementChecks.map(({ label, detail, icon: Icon }, index) => {
              const passed = stage !== 'position' || index < checksPassed
              return (
                <div className={passed ? 'placement-check placement-check--passed' : 'placement-check'} key={label}>
                  <span className="placement-check__icon">{passed ? <Check size={15} /> : <Icon size={15} />}</span>
                  <span><strong>{label}</strong><small>{detail}</small></span>
                  <span className="placement-check__state">{passed ? 'Passed' : isChecking ? 'Checking' : 'Pending'}</span>
                </div>
              )
            })}
          </div>

          <div className="calibration-actions">
            {stage === 'position' && !checkComplete && (
              <button className="button button--primary" type="button" onClick={() => { setChecksPassed(0); setIsChecking(true) }} disabled={isChecking}>
                {isChecking ? <><Circle className="spin-icon" size={16} /> Checking placement</> : <><ScanFace size={16} /> Run placement check</>}
              </button>
            )}
            {stage === 'position' && checkComplete && (
              <button className="button button--primary" type="button" onClick={onStartBaseline}>
                Start anonymous baseline <ChevronRight size={17} />
              </button>
            )}
            {stage === 'ready' && (
              <button className="button button--primary" type="button" onClick={onEnterDrive}>
                Enter Drive Mode <ArrowRight size={17} />
              </button>
            )}
            {stage !== 'ready' && (
              <button className="button button--quiet" type="button" onClick={onComplete}>
                <FastForward size={15} /> Skip to ready
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
