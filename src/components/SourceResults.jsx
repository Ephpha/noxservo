export default function SourceResults({ results }) {
  if (!results || results.length === 0) return null

  return (
    <div className="mt-6 animate-slide-down">
      <p className="text-[#3d3d3d] text-xs tracking-widest uppercase mb-3">
        Sources
      </p>
      <ul className="space-y-px">
        {results.map((result, i) => (
          <li key={i}>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-4 border-b border-[#111] hover:border-[#1c1c1c] transition-colors"
            >
              <span className="text-[#3d3d3d] text-xs tracking-wide">
                {result.domain}
              </span>
              <h3 className="text-[#c4c4c4] text-sm mt-0.5 group-hover:text-[#D4A853] transition-colors duration-200 leading-snug">
                {result.title}
              </h3>
              <p className="text-[#555] text-xs mt-1 leading-relaxed">
                {result.snippet}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
