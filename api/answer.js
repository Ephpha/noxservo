/**
 * /api/answer
 * Generates a concise AI answer via Claude Haiku.
 * Env var: ANTHROPIC_API_KEY (set in Vercel dashboard)
 */

import Anthropic from '@anthropic-ai/sdk'

export default async function handler(req, res) {
  const query = req.query?.q || ''

  if (!query.trim()) {
    return res.status(400).json({ error: 'Missing query parameter: q' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' })
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: `Answer this search query in 2-3 sentences. Be factual, direct, and concise. Do not use filler phrases like "Great question" or "Certainly". Do not start with "I". Just answer.

Query: ${query}`,
        },
      ],
    })

    const text = message.content?.[0]?.text?.trim() || null

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
    return res.status(200).json(text ? { text, source: null } : null)
  } catch (err) {
    console.error('[api/answer] error:', err)
    // Return null so the UI falls back to sources-only gracefully
    return res.status(200).json(null)
  }
}
