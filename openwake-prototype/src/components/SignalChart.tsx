import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { TelemetrySample } from '../demo/demoTypes'

type SignalChartProps = {
  samples: TelemetrySample[]
  compact?: boolean
}

const tooltipStyle = {
  background: 'var(--surface-1)',
  border: '1px solid var(--border-strong)',
  borderRadius: '6px',
  color: 'var(--text)',
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
              <stop offset="0%" stopColor="var(--aqua)" stopOpacity={0.12} />
              <stop offset="100%" stopColor="var(--aqua)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" />
          <XAxis
            dataKey="second"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            minTickGap={28}
            tickFormatter={(value) => `${value}s`}
          />
          <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
          <Tooltip contentStyle={tooltipStyle} labelFormatter={(value) => `${value}s simulated`} />
          <Area type="monotone" dataKey="risk" stroke="none" fill="url(#riskFill)" isAnimationActive={false} />
          <Line type="monotone" dataKey="quality" stroke="var(--text-muted)" strokeWidth={1.25} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="risk" stroke="var(--aqua)" strokeWidth={2} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="caution" stroke="var(--amber)" strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
