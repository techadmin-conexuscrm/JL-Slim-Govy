const sealBase =
  'trust-seal w-14 h-14 rounded-full flex items-center justify-center flex-col font-black text-white text-center leading-none text-[7px]'

export default function TrustBadges() {
  return (
    <div className="pt-4 flex flex-col items-center gap-3 w-full">
      {/* Seals row */}
      <div className="flex items-center justify-center gap-3">
        <div className={`${sealBase} bg-[#c0392b]`}>
          <div className="flex flex-col items-center gap-px">
            <span className="text-sm font-black leading-none">90</span>
            <span className="text-[6px] font-bold uppercase tracking-[0.3px] leading-none">DAYS</span>
          </div>
        </div>
        <div className={`${sealBase} bg-[#1a5276]`}>
          <div className="flex flex-col items-center gap-px">
            <span className="text-[10px] font-black leading-none">BEST</span>
            <span className="text-[6px] font-bold uppercase tracking-[0.3px] leading-none">CHOICE</span>
          </div>
        </div>
        <div className={`${sealBase} bg-[#1e8449]`}>
          <div className="flex flex-col items-center gap-px">
            <span className="text-base leading-none">🔒</span>
            <span className="text-[6px] font-bold uppercase tracking-[0.3px] leading-none">SECURE</span>
          </div>
        </div>
      </div>

      {/* Payment icons */}
      <div className="flex items-center justify-center gap-1.5 py-2 px-5 rounded-lg bg-black/[0.07] w-full max-w-[300px]">
        {[
          { label: 'VISA', cls: 'text-[#1a1f71] italic' },
          { label: 'MC', cls: 'text-[#eb001b]' },
          { label: 'AMEX', cls: 'text-[#006fcf] text-[9px]' },
          { label: 'DISC', cls: 'text-[#f76b1c] text-[7px] tracking-normal' },
          { label: 'JCB', cls: 'text-[#0e4c96] text-[9px]' },
        ].map(({ label, cls }) => (
          <span
            key={label}
            className={`flex-1 h-[30px] rounded-[5px] bg-white border border-gray-200 flex items-center justify-center font-black text-[10px] tracking-[0.5px] ${cls}`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
