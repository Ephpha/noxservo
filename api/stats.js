/**
 * /api/stats
 * POST: Increments community counters and returns updated totals.
 * GET:  Returns current community totals without incrementing.
 * Env vars: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
 */

import { Redis } from '@upstash/redis'

export default async function handler(req, res) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return res.status(500).json({ error: 'Redis not configured' })
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  try {
    if (req.method === 'POST') {
      const { wh } = req.body || {}
      const energy = parseFloat(wh) || 0

      const [searches, totalWh] = await Promise.all([
        redis.incr('total_searches'),
        energy > 0
          ? redis.incrbyfloat('total_wh', energy)
          : redis.get('total_wh'),
      ])

      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json({
        searches: Number(searches),
        totalWh: parseFloat(totalWh) || 0,
        totalKwh: (parseFloat(totalWh) || 0) / 1000,
      })
    } else {
      // GET — read-only
      const [searches, totalWh] = await Promise.all([
        redis.get('total_searches'),
        redis.get('total_wh'),
      ])

      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json({
        searches: Number(searches) || 0,
        totalWh: parseFloat(totalWh) || 0,
        totalKwh: (parseFloat(totalWh) || 0) / 1000,
      })
    }
  } catch (err) {
    console.error('[api/stats] error:', err)
    return res.status(500).json({ error: 'Stats unavailable' })
  }
}
