export default function HealthBanner() {
  return (
    <div className="bg-black text-white flex items-center justify-between px-4 py-[14px] max-w-narrow mx-auto border-b-[3px] border-news-red">
      <button aria-label="Menu" className="w-10 h-10 flex items-center justify-center text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[26px] h-[26px]">
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      <p className="font-dm-sans text-[22px] font-bold text-white">Health</p>

      <button aria-label="Search" className="w-10 h-10 flex items-center justify-center text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[26px] h-[26px]">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </div>
  )
}
