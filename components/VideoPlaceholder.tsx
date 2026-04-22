export default function VideoPlaceholder() {
  return (
    <div className="max-w-narrow mx-auto bg-black">
      {/* 16:9 aspect ratio via padding trick */}
      <div className="relative w-full pt-[56.25%] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
          <button
            aria-label="Play video"
            className="w-[72px] h-[72px] rounded-full bg-[#3974ff] flex items-center justify-center transition-transform hover:scale-105 shadow-[0_4px_24px_rgba(57,116,255,0.4)]"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" />
            </svg>
          </button>
          <span className="text-white/50 text-[13px] font-medium tracking-[1px] uppercase">
            Video Placeholder
          </span>
        </div>
      </div>
    </div>
  )
}
