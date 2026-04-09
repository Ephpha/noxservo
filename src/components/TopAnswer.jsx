export default function TopAnswer({ answer, query }) {
  if (!answer) return null

  return (
    <div className="animate-fade-in">
      <p className="text-[#3d3d3d] text-xs tracking-widest uppercase mb-3">
        Answer
      </p>
      <div className="border border-[#1c1c1c] rounded-lg p-5 bg-[#050505]">
        <p className="text-[#d4d4d4] text-sm leading-relaxed">
          {answer.text}
        </p>
        {answer.source && (
          <a
            href={answer.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-[#D4A853] text-xs hover:underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            {answer.source.domain}
          </a>
        )}
      </div>
    </div>
  )
}
