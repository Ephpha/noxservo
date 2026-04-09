/**
 * /api/answer
 * Fetches search results from Tavily, then generates a grounded answer via Claude Haiku.
 * Env vars: ANTHROPIC_API_KEY, TAVILY_API_KEY
 */

import Anthropic from '@anthropic-ai/sdk'

export default async function handler(req, res) {
  const query = req.query?.q || ''

  if (!query.trim()) {
    return res.status(400).json({ error: 'Missing query parameter: q' })
  }

  if (!process.env.ANTHROPIC_API_KEY || !process.env.TAVILY_API_KEY) {
    return res.status(500).json({ error: 'API keys not configured' })
  }

  try {
    // Fetch search results to ground the answer
    const tavilyRes = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        search_depth: 'basic',
        max_results: 3,
        include_answer: false,
      }),
    })

    const tavilyData = tavilyRes.ok ? await tavilyRes.json() : { results: [] }
    const snippets = (tavilyData.results || [])
      .map((r, i) => `[${i + 1}] ${r.title}: ${r.content?.substring(0, 300) || ''}`)
      .join('\n\n')

    const context = snippets
      ? `Here are web search results for context:\n\n${snippets}\n\n`
      : ''

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: `${context}Answer this search query in 2-3 sentences based on the search results above. Be factual and accurate. If the search results don't contain relevant info, say so briefly. Do not use filler phrases. Do not start with "I". Just answer.

Query: ${query}`,
        },
      ],
    })

    const text = message.content?.[0]?.text?.trim() || null
    const inputTokens = message.usage?.input_tokens || 0
    const outputTokens = message.usage?.output_tokens || 0

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
    return res.status(200).json(
      text ? { text, source: null, tokens: { input: inputTokens, output: outputTokens } } : null
    )
  } catch (err) {
    console.error('[api/answer] error:', err)
    return res.status(200).json(null)
  }
}
