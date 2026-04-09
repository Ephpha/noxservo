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

  if (stats === null || stats.searches === 0) return null

  // Google avg ~0.3 Wh/search, Noxservo actual stored in total_wh
  const savedWh = (stats.searches * 0.3) - stats.totalWh
  const display = savedWh >= 1000
    ? (savedWh / 1000).toFixed(3) + ' kWh'
    : savedWh.toFixed(2) + ' Wh'

  return (
    <p className="text-[#3d3d3d] text-xs tracking-widest mt-6 tabular-nums">
      {stats.searches.toLocaleString('en-US')} searches &middot; {display} saved vs Big Search
    </p>
  )
}
