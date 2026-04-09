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

      <main className="max-w-2xl mx-auto px-4 py-14 space-y-14">

        {/* Title */}
        <div>
          <h1 className="pixel-logo text-base mb-4">ABOUT</h1>
          <p className="text-[#444] text-xs tracking-widest font-mono">// loading lore...</p>
        </div>

        {/* What is a Noxservo */}
        <section className="border border-[#1a1a1a] rounded-lg p-6 space-y-4">
          <h2 className="pixel-logo text-xs" style={{ color: '#D4A853' }}>WHAT IS A NOXSERVO?</h2>
          <p className="text-sm text-[#888] leading-relaxed font-mono">
            <span className="text-[#c8c8c8]">NOX</span> — Latin for <span className="text-[#c8c8c8]">night</span>. Darkness. The void between the stars.
          </p>
          <p className="text-sm text-[#888] leading-relaxed font-mono">
            <span className="text-[#c8c8c8]">SERVO</span> — Latin for <span className="text-[#c8c8c8]">to protect</span>. To guard. To preserve.
          </p>
          <p className="text-sm text-[#888] leading-relaxed font-mono">
            Together: <span className="text-[#c8c8c8]">Protector of the Night.</span>
          </p>
          <p className="text-sm text-[#666] leading-relaxed font-mono pt-2 border-t border-[#1a1a1a]">
            It searches in silence. It operates in the dark. It leaves no trace. While Big Search is out there flooding the web with noise, Noxservo slips through the shadows, gets you your answer, and disappears. No footprint. No fuss. Just results from the void.
          </p>
          <p className="text-[#D4A853] text-xs font-mono tracking-widest pt-1">
            // guardian of quiet queries since 2025
          </p>
        </section>

        {/* What is it */}
        <section className="space-y-3">
          <h2 className="pixel-logo text-xs" style={{ color: '#D4A853' }}>WHAT DOES IT DO?</h2>
          <p className="text-sm text-[#888] leading-relaxed font-mono">
            Noxservo is a minimal, energy-efficient search engine. Ask it anything. It fetches real web results, hands them to an AI, and gives you a clean answer — no ads, no tracking, no bloat. Search, get answer, vanish.
          </p>
        </section>

        {/* How it works */}
        <section className="space-y-3">
          <h2 className="pixel-logo text-xs" style={{ color: '#D4A853' }}>HOW IT WORKS</h2>
          <div className="space-y-2 text-sm text-[#888] font-mono">
            <p><span className="text-[#D4A853]">&gt;</span> you type a query</p>
            <p><span className="text-[#D4A854]">&gt;</span> noxservo silently fetches real-time web results</p>
            <p><span className="text-[#D4A853]">&gt;</span> those results are fed to an AI for a grounded answer</p>
            <p><span className="text-[#D4A853]">&gt;</span> answer delivered. query forgotten. darkness restored.</p>
          </div>
        </section>

        {/* Energy */}
        <section className="space-y-3">
          <h2 className="pixel-logo text-xs" style={{ color: '#D4A853' }}>WHY LESS ENERGY?</h2>
          <p className="text-sm text-[#888] leading-relaxed font-mono">
            Big Search uses <span className="text-[#c8c8c8]">~0.3 Wh</span> per query powering ad servers, tracking infrastructure, and personalisation engines. Noxservo uses <span className="text-[#c8c8c8]">~0.15 Wh</span> — one lean search call, one small model call. That's it. The darkness is efficient.
          </p>
        </section>

        {/* Privacy */}
        <section className="space-y-3">
          <h2 className="pixel-logo text-xs" style={{ color: '#D4A853' }}>PRIVACY</h2>
          <p className="text-sm text-[#888] leading-relaxed font-mono">
            No search history stored. No profile built. No data sold. The only thing logged is the community search count and total Wh — no query content, no IPs, nothing personal. The night protects you.
          </p>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t border-[#111]">
          <p className="pixel-logo text-xs" style={{ color: '#272727', fontSize: '0.5rem' }}>
            NOX · SERVO · SEARCH QUIETLY
          </p>
        </div>

      </main>
    </div>
  )
}
