/**
 * /api/search
 *
 * Returns web search results for the given query.
 * Currently returns mock data. Replace the body of `fetchResults`
 * with a real Brave Search API call (or similar) once ready.
 *
 * Environment variables (set in Vercel dashboard, never in client bundle):
 *   BRAVE_SEARCH_API_KEY  — https://api.search.brave.com
 */

const MOCK_RESULTS = [
  {
    title: 'Quantum computing — Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Quantum_computing',
    domain: 'en.wikipedia.org',
    snippet: 'A type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement to perform calculations.',
  },
  {
    title: 'What is quantum computing? — IBM',
    url: 'https://www.ibm.com/topics/quantum-computing',
    domain: 'ibm.com',
    snippet: 'Quantum computers can solve certain complex problems billions of times faster than classical computers by exploiting quantum physics.',
  },
  {
    title: 'Quantum computing explained — Nature',
    url: 'https://www.nature.com/articles/d41586-019-01213-z',
    domain: 'nature.com',
    snippet: 'An accessible introduction to the principles behind quantum computing and the current state of hardware development.',
  },
  {
    title: 'The quantum computing race — MIT Technology Review',
    url: 'https://www.technologyreview.com/topic/quantum-computing/',
    domain: 'technologyreview.com',
    snippet: 'Coverage of breakthroughs, setbacks, and the commercial race to build practical quantum computers.',
  },
  {
    title: 'Quantum supremacy — Google AI Blog',
    url: 'https://ai.googleblog.com/2019/10/quantum-supremacy-using-programmable.html',
    domain: 'ai.googleblog.com',
    snippet: "Google's Sycamore processor performed a specific computation in 200 seconds that would take the world's fastest classical supercomputer 10,000 years.",
  },
]

async function fetchResults(query) {
  // --- REPLACE THIS SECTION with real Brave Search API call ---
  // const response = await fetch(
  //   `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5`,
  //   { headers: { 'X-Subscription-Token': process.env.BRAVE_SEARCH_API_KEY } }
  // )
  // const data = await response.json()
  // return data.web?.results?.map((r) => ({
  //   title: r.title,
  //   url: r.url,
  //   domain: new URL(r.url).hostname.replace('www.', ''),
  //   snippet: r.description,
  // })) || []
  // ------------------------------------------------------------

  // Simulate a short delay so the UI loading state is visible in dev
  await new Promise((resolve) => setTimeout(resolve, 300))

  return MOCK_RESULTS
}

export default async function handler(req, res) {
  const query = req.query?.q || ''

  if (!query.trim()) {
    return res.status(400).json({ error: 'Missing query parameter: q' })
  }

  try {
    const results = await fetchResults(query)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.status(200).json({ results })
  } catch (err) {
    console.error('[api/search] error:', err)
    return res.status(500).json({ error: 'Failed to fetch results' })
  }
}
