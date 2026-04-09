/**
 * /api/answer
 *
 * Returns an AI-generated answer for the given query.
 * Currently returns mock data. Replace the body of `fetchAnswer`
 * with your real AI provider call (e.g. Claude API, OpenAI) once ready.
 *
 * Environment variables (set in Vercel dashboard, never in client bundle):
 *   ANTHROPIC_API_KEY  — for Claude API
 *   OPENAI_API_KEY     — alternative
 */

const MOCK_ANSWERS = {
  default: {
    text: 'This is a placeholder answer. Once the AI backend is connected, a concise, accurate response will appear here based on your query and the top search results.',
    source: {
      url: 'https://en.wikipedia.org',
      domain: 'en.wikipedia.org',
    },
  },
  'quantum computing': {
    text: 'Quantum computing uses quantum mechanical phenomena — superposition and entanglement — to process information in ways classical computers cannot. A quantum bit (qubit) can exist in multiple states simultaneously, enabling certain calculations to run exponentially faster than on traditional hardware.',
    source: {
      url: 'https://en.wikipedia.org/wiki/Quantum_computing',
      domain: 'en.wikipedia.org',
    },
  },
  'climate change': {
    text: 'Climate change refers to long-term shifts in global temperatures and weather patterns, primarily driven since the mid-20th century by human activities — chiefly the burning of fossil fuels. The resulting greenhouse gas emissions trap heat in the atmosphere, raising average global temperatures.',
    source: {
      url: 'https://climate.nasa.gov',
      domain: 'climate.nasa.gov',
    },
  },
}

async function fetchAnswer(query) {
  // --- REPLACE THIS SECTION with real AI API call ---
  // Example using Claude API (server-side only):
  //
  // const Anthropic = require('@anthropic-ai/sdk')
  // const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  // const message = await client.messages.create({
  //   model: 'claude-sonnet-4-6',
  //   max_tokens: 300,
  //   messages: [{ role: 'user', content: `Answer concisely in 2-3 sentences: ${query}` }]
  // })
  // return { text: message.content[0].text, source: null }
  // --------------------------------------------------

  const key = Object.keys(MOCK_ANSWERS).find((k) =>
    query.toLowerCase().includes(k)
  )
  return MOCK_ANSWERS[key] || MOCK_ANSWERS['default']
}

export default async function handler(req, res) {
  const query = req.query?.q || ''

  if (!query.trim()) {
    return res.status(400).json({ error: 'Missing query parameter: q' })
  }

  try {
    const answer = await fetchAnswer(query)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(answer)
  } catch (err) {
    console.error('[api/answer] error:', err)
    return res.status(500).json({ error: 'Failed to generate answer' })
  }
}
