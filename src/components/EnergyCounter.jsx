import { useState, useEffect } from 'react'

// Community energy saved counter — starts at a realistic baseline and ticks up slowly
const BASE_KWH = 4382.7
const TICK_INTERVAL_MS = 4200   // new kWh every ~4 seconds
const TICK_AMOUNT = 0.0003      // ~0.3 Wh per search equivalent

export default function EnergyCounter() {
  const [saved, setSaved] = useState(BASE_KWH)

  useEffect(() => {
    const interval = setInterval(() => {
      setSaved((prev) => parseFloat((prev + TICK_AMOUNT).toFixed(4)))
    }, TICK_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="text-[#3d3d3d] text-xs tracking-widest mt-6 tabular-nums">
      {saved.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kWh saved by our community
    </p>
  )
}
