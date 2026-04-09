import { useState, useEffect } from 'react'

export default function EnergyCounter() {
  const [kwh, setKwh] = useState(null)

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.totalKwh === 'number') {
          setKwh(data.totalKwh)
        }
      })
      .catch(() => {})
  }, [])

  if (kwh === null) return null

  return (
    <p className="text-[#3d3d3d] text-xs tracking-widest mt-6 tabular-nums">
      {kwh.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} kWh used by our community
    </p>
  )
}
