import SearchBar from '../components/SearchBar.jsx'
import EnergyCounter from '../components/EnergyCounter.jsx'

export default function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xl flex flex-col items-center animate-fade-in">

        {/* Wordmark */}
        <h1
          className="text-3xl font-semibold tracking-[0.25em] uppercase"
          style={{ color: '#D4A853', letterSpacing: '0.3em' }}
        >
          Noxservo
        </h1>

        {/* Tagline */}
        <p className="text-[#2e2e2e] text-xs tracking-widest mt-3 mb-10">
          the search engine that wastes nothing
        </p>

        {/* Search */}
        <div className="w-full">
          <SearchBar />
        </div>

        {/* Energy counter */}
        <EnergyCounter />

      </div>
    </div>
  )
}
