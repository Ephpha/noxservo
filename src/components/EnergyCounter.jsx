import { useState, useEffect } from 'react'

async function fetchStats() {
  try {
    const r = await fetch('/api/stats')
    const data = await r.json()
    return typeof data.totalKwh === 'number' ? data : null
  } catch {
    return null
  }
}

export default function EnergyCounter() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchStats().then(setStats)
    const interval = setInterval(() => fetchStats().then(setStats), 15000)
    return () => clearInterval(interval)
  }, [])

  if (stats === null) return null

  return (
    <p className="text-[#3d3d3d] text-xs tracking-widest mt-6 tabular-nums">
      {stats.searches.toLocaleString('en-US')} searches &middot;{' '}
      {stats.totalKwh.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} kWh used by our community
    </p>
  )
}
