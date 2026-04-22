const TICKER_TEXT =
  'BREAKING NEWS \u2022 LIVE UPDATES \u2022 BREAKING NEWS \u2022 LIVE UPDATES \u2022 BREAKING NEWS \u2022 LIVE UPDATES \u2022 BREAKING NEWS \u2022 LIVE UPDATES \u2022'

export default function Ticker() {
  return (
    <div className="bg-breaking-red overflow-hidden max-w-narrow mx-auto" aria-hidden="true">
      {/* Two copies of the text so the loop looks seamless at -50% */}
      <div className="flex whitespace-nowrap animate-ticker">
        <span className="text-white font-arial text-[13px] font-bold tracking-[0.5px] py-[5px] pb-[6.8px] mr-10">
          {TICKER_TEXT}
        </span>
        <span className="text-white font-arial text-[13px] font-bold tracking-[0.5px] py-[5px] pb-[6.8px] mr-10">
          {TICKER_TEXT}
        </span>
      </div>
    </div>
  )
}
