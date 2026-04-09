import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-black text-[#e5e5e5]">

      {/* Top bar */}
      <header className="border-b border-[#111] px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="pixel-logo" style={{ fontSize: '0.6rem' }}>
            NOXSERVO
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-14 space-y-10">

        <section>
          <h2 className="text-xs tracking-widest uppercase text-[#D4A853] mb-3">What is Noxservo?</h2>
          <p className="text-sm text-[#888] leading-relaxed">
            Noxservo is a minimal, energy-efficient search engine. It gives you a direct AI answer backed by real web sources — no ads, no tracking, no bloat. You search, you get an answer, you leave.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-widest uppercase text-[#D4A853] mb-3">How it works</h2>
          <div className="space-y-2 text-sm text-[#888] leading-relaxed">
            <p>1. You type a query.</p>
            <p>2. Noxservo fetches real-time web results via <span className="text-[#c8c8c8]">Tavily</span>.</p>
            <p>3. Those results are passed to <span className="text-[#c8c8c8]">Claude Haiku</span> to generate a grounded, factual answer.</p>
            <p>4. The answer and sources are returned to you — nothing stored, nothing logged.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xs tracking-widest uppercase text-[#D4A853] mb-3">Why less energy?</h2>
          <p className="text-sm text-[#888] leading-relaxed">
            A typical Google search uses around <span className="text-[#c8c8c8]">0.3 Wh</span> — powering data centers, ad servers, tracking infrastructure, and personalisation engines. Noxservo skips all of that. A search here uses roughly <span className="text-[#c8c8c8]">0.15 Wh</span> — one lean API call for results, one small model call for the answer. That's it.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-widest uppercase text-[#D4A853] mb-3">Privacy</h2>
          <p className="text-sm text-[#888] leading-relaxed">
            Noxservo does not store your searches, does not build a profile on you, and does not sell your data. The only thing saved is the community search count and total Wh — no query content, no IP addresses.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-widest uppercase text-[#D4A853] mb-3">Built with</h2>
          <ul className="text-sm text-[#888] space-y-1">
            <li><span className="text-[#c8c8c8]">React + Vite</span> — frontend</li>
            <li><span className="text-[#c8c8c8]">Vercel</span> — hosting + serverless functions</li>
            <li><span className="text-[#c8c8c8]">Tavily</span> — web search</li>
            <li><span className="text-[#c8c8c8]">Claude Haiku</span> — AI answers</li>
            <li><span className="text-[#c8c8c8]">Upstash Redis</span> — community energy counter</li>
          </ul>
        </section>

        <p className="text-[#272727] text-xs tracking-widest pt-6">
          noxservo — search quietly.
        </p>

      </main>
    </div>
  )
}
