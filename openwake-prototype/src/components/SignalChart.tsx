import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { TelemetrySample } from '../demo/demoTypes'

type SignalChartProps = {
  samples: TelemetrySample[]
  compact?: boolean
}

const tooltipStyle = {
  background: '#151919',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: '12px',
  color: '#f4f7f6',
  fontSize: '12px',
}

export function SignalChart({ samples, compact = false }: SignalChartProps) {
  const data = samples.map((sample) => ({
    second: Math.round(sample.timestampMs / 1000),
    risk: sample.fatigueRisk,
    caution: sample.fatigueRisk >= 45 ? sample.fatigueRisk : null,
    quality: sample.quality,
  }))

  return (
    <div
      className={compact ? 'signal-chart signal-chart--compact' : 'signal-chart'}
      role="img"
      aria-label="Simulated fatigue risk and signal quality over the latest sixty seconds"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 4, bottom: 0, left: -24 }}>
          <defs>
            <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#77f0dd" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#77f0dd" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,.055)" strokeDasharray="3 5" />
          <XAxis
            dataKey="second"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#72807c', fontSize: 10 }}
            minTickGap={28}
            tickFormatter={(value) => `${value}s`}
          />
          <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#72807c', fontSize: 10 }} />
          <Tooltip contentStyle={tooltipStyle} labelFormatter={(value) => `${value}s simulated`} />
          <Area type="monotone" dataKey="risk" stroke="none" fill="url(#riskFill)" isAnimationActive={false} />
          <Line type="monotone" dataKey="quality" stroke="#3d6f69" strokeWidth={1.25} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="risk" stroke="#77f0dd" strokeWidth={2} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="caution" stroke="#ffb45b" strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
