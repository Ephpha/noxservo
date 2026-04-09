import SearchBar from '../components/SearchBar.jsx'
import EnergyCounter from '../components/EnergyCounter.jsx'

export default function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xl flex flex-col items-center animate-fade-in">

        {/* Wordmark */}
        <h1 className="pixel-logo text-2xl mb-1">
          NOXSERVO
        </h1>

        {/* Tagline */}
        <p className="text-[#2e2e2e] text-xs tracking-widest mt-3 mb-10">
          search quietly.
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
