import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ initialValue = '', compact = false }) {
  const [query, setQuery] = useState(initialValue)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/results?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="shhh. searching."
          autoComplete="off"
          spellCheck="false"
          className={`
            search-input
            w-full bg-transparent border border-[#2a2a2a]
            text-[#e5e5e5] placeholder-[#3a3a3a]
            transition-all duration-300
            ${compact
              ? 'h-10 px-4 text-sm rounded-md'
              : 'h-12 px-5 text-base rounded-lg'
            }
          `}
        />
        <button
          type="submit"
          aria-label="Search"
          className={`
            absolute right-0 top-0 bottom-0
            flex items-center justify-center
            text-[#3a3a3a] hover:text-[#D4A853]
            transition-colors duration-200
            ${compact ? 'px-3' : 'px-4'}
          `}
        >
          <svg
            width={compact ? 14 : 16}
            height={compact ? 14 : 16}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="6.5" cy="6.5" r="4.5" />
            <line x1="10" y1="10" x2="14" y2="14" />
          </svg>
        </button>
      </div>
    </form>
  )
}
