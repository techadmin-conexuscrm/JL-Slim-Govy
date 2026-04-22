import Timer from './Timer'

export default function ArrowSection() {
  return (
    <section className="arrow-triangle bg-navy py-10 pb-9 text-center">
      <div className="w-full max-w-page mx-auto px-5">
        <div className="flex items-start justify-center gap-7 max-[767px]:gap-4">
          {/* Left chevron */}
          <span className="animate-chevron-bounce text-white/70 flex-shrink-0 mt-1">
            <svg
              width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="max-[767px]:w-7 max-[767px]:h-7"
            >
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
          </span>

          {/* Heading */}
          <span className="flex flex-col items-center font-outfit font-bold text-white">
            <span className="text-[32px] whitespace-nowrap max-[767px]:text-[22px] max-[767px]:whitespace-normal">
              Claim Your Discounted SlimGovy
            </span>
            <span className="text-[32px] max-[767px]:text-[22px]">Below For Huge Savings</span>
          </span>

          {/* Right chevron */}
          <span className="animate-chevron-bounce text-white/70 flex-shrink-0 mt-1">
            <svg
              width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="max-[767px]:w-7 max-[767px]:h-7"
            >
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
          </span>
        </div>

        <div className="mt-5">
          <Timer initialSeconds={600} />
        </div>
      </div>
    </section>
  )
}
