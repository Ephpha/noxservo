import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import TopAnswer from '../components/TopAnswer.jsx'
import SourceResults from '../components/SourceResults.jsx'

export default function Results() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [answer, setAnswer] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [energyWh, setEnergyWh] = useState(null)

  useEffect(() => {
    if (query) {
      document.title = `${query} — Noxservo`
    }
    return () => { document.title = 'Noxservo' }
  }, [query])

  useEffect(() => {
    if (!query) return
    setLoading(true)
    setExpanded(false)
    setAnswer(null)
    setResults([])
    setEnergyWh(null)

    // Fetch answer and search results in parallel
    Promise.all([
      fetch(`/api/answer?q=${encodeURIComponent(query)}`).then((r) => r.json()),
      fetch(`/api/search?q=${encodeURIComponent(query)}`).then((r) => r.json()),
    ])
      .then(([answerData, searchData]) => {
        setAnswer(answerData)
        const resultList = searchData.results || []
        setResults(resultList)
        // No AI answer available — auto-expand sources so the page isn't empty
        if (!answerData) setExpanded(true)

        // Calculate real energy: ~0.15 Wh for search + Claude tokens
        const tokens = answerData?.tokens
        const wh = tokens
          ? 0.15 + ((tokens.input + tokens.output) * 0.002) / 1000
          : 0.15
        const whRounded = parseFloat(wh.toFixed(3))
        setEnergyWh(whRounded)

        // Report to community stats (fire-and-forget)
        fetch('/api/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wh: whRounded }),
        }).catch(() => {})
      })
      .catch(() => {
        setAnswer(null)
        setResults([])
      })
      .finally(() => setLoading(false))
  }, [query])

  return (
    <div className="min-h-screen bg-black">

      {/* Top bar */}
      <header className="border-b border-[#111] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-5">
          <Link
            to="/"
            className="text-sm font-semibold tracking-[0.2em] uppercase shrink-0"
            style={{ color: '#D4A853' }}
          >
            Noxservo
          </Link>
          <div className="flex-1 max-w-lg">
            <SearchBar initialValue={query} compact />
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-2xl mx-auto px-4 py-10">

        {loading ? (
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="h-2 w-16 bg-[#1a1a1a] rounded" />
            <div className="h-24 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg" />
          </div>
        ) : (
          <>
            <TopAnswer answer={answer} query={query} />

            {/* Show more toggle */}
            {results.length > 0 && (
              <div className="mt-8">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="flex items-center gap-2 text-[#3d3d3d] text-xs tracking-widest uppercase hover:text-[#D4A853] transition-colors duration-200"
                >
                  <span>{expanded ? 'Hide sources' : 'Show sources'}</span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                  >
                    <polyline points="1,3 5,7 9,3" />
                  </svg>
                </button>

                {expanded && <SourceResults results={results} />}
              </div>
            )}

            {/* Energy note */}
            {energyWh !== null && (
              <p className="text-[#272727] text-xs tracking-widest mt-12">
                this search used ~{energyWh} Wh
              </p>
            )}
          </>
        )}

      </main>
    </div>
  )
}
