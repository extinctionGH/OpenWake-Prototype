import { ShieldCheck } from 'lucide-react'

export default function App() {
  return (
    <main className="foundation-shell">
      <div className="foundation-mark" aria-hidden="true">
        <ShieldCheck size={28} strokeWidth={1.7} />
      </div>
      <p className="eyebrow">Interactive prototype · Simulated data</p>
      <h1>OpenWake</h1>
      <p className="foundation-copy">Driver awareness, presented clearly.</p>
    </main>
  )
}
