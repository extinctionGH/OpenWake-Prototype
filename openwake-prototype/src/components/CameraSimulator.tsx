import { Camera, ScanFace } from 'lucide-react'
import type { DriverState } from '../demo/demoTypes'
import { StatusBadge } from './StatusBadge'

type CameraSimulatorProps = {
  status?: 'searching' | 'aligned' | 'monitoring'
  driverState?: DriverState
  quality?: number
  compact?: boolean
}

const landmarkPoints = [
  ['34%', '40%'], ['42%', '39%'], ['58%', '39%'], ['66%', '40%'],
  ['50%', '48%'], ['45%', '58%'], ['50%', '60%'], ['55%', '58%'],
]

export function CameraSimulator({
  status = 'searching',
  driverState = 'attentive',
  quality = 96,
  compact = false,
}: CameraSimulatorProps) {
  const statusLabel = status === 'searching' ? 'Searching' : status === 'aligned' ? 'Face aligned' : 'Tracking simulated'
  const tone = driverState === 'critical' ? 'danger' : driverState === 'caution' ? 'warning' : status === 'searching' ? 'neutral' : 'aqua'

  return (
    <div className={`camera-simulator camera-simulator--${driverState}${compact ? ' camera-simulator--compact' : ''}`}>
      <div className="camera-simulator__grid" aria-hidden="true" />
      <div className="camera-simulator__vignette" aria-hidden="true" />
      <div className="camera-simulator__topline">
        <span><Camera size={14} aria-hidden="true" />Simulated camera</span>
        <StatusBadge label={statusLabel} tone={tone} icon={ScanFace} />
      </div>

      <div className="face-frame" aria-hidden="true">
        <span className="face-frame__oval" />
        <span className="face-frame__eye face-frame__eye--left" />
        <span className="face-frame__eye face-frame__eye--right" />
        <span className="face-frame__nose" />
        <span className="face-frame__mouth" />
        {landmarkPoints.map(([left, top], index) => (
          <i className="face-frame__point" style={{ left, top }} key={`${left}-${top}-${index}`} />
        ))}
      </div>

      <span className="camera-corner camera-corner--tl" aria-hidden="true" />
      <span className="camera-corner camera-corner--tr" aria-hidden="true" />
      <span className="camera-corner camera-corner--bl" aria-hidden="true" />
      <span className="camera-corner camera-corner--br" aria-hidden="true" />

      <div className="camera-simulator__footer">
        <span>Decorative landmarks · No camera access</span>
        <span>{quality}% quality</span>
      </div>
    </div>
  )
}
