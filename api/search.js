/**
 * /api/search
 * Fetches web search results via Tavily Search API.
 * Env var: TAVILY_API_KEY (set in Vercel dashboard)
 */

export default async function handler(req, res) {
  const query = req.query?.q || ''

  if (!query.trim()) {
    return res.status(400).json({ error: 'Missing query parameter: q' })
  }

  if (!process.env.TAVILY_API_KEY) {
    return res.status(500).json({ error: 'TAVILY_API_KEY not configured' })
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        search_depth: 'basic',
        max_results: 5,
        include_answer: false,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('[api/search] Tavily error:', err)
      return res.status(502).json({ error: 'Search provider error' })
    }

    const data = await response.json()

    const results = (data.results || []).map((r) => ({
      title: r.title,
      url: r.url,
      domain: new URL(r.url).hostname.replace(/^www\./, ''),
      snippet: r.content?.substring(0, 160) || '',
    }))

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.status(200).json({ results })
  } catch (err) {
    console.error('[api/search] error:', err)
    return res.status(500).json({ error: 'Failed to fetch results' })
  }
}
