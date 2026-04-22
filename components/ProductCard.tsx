import Image from 'next/image'
import type { Product } from '@/lib/types'
import TrustBadges from './TrustBadges'

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#00da98" className="flex-shrink-0 mt-0.5">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
)

const badgeStyles: Record<Product['badge'], string> = {
  basic: 'bg-[#607d8b]',
  popular: 'bg-sg-pink',
  bundle: 'bg-sg-magenta',
}

export default function ProductCard({ product }: { product: Product }) {
  const { label, badge, plan, supply, imageUrl, bonus, price, features, perServing, isPopular } = product

  return (
    <div
      className={`rounded-2xl overflow-hidden border-2 border-border-gray bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(13,50,82,0.12)] flex flex-col cursor-pointer ${isPopular ? 'card-popular' : ''}`}
    >
      {/* Badge */}
      <div
        className={`text-center py-2.5 px-4 font-outfit font-black text-sm tracking-[1.5px] uppercase text-white ${badgeStyles[badge]}`}
      >
        {label}
      </div>

      {/* Body */}
      <div className="px-5 pb-7 pt-6 text-center flex-1 flex flex-col items-center">
        <div className="font-outfit text-[26px] font-black text-navy uppercase">{plan}</div>
        <div className="text-[15px] text-muted mt-0.5">{supply}</div>

        {bonus && (
          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-navy text-white text-[13px] font-bold">
            <span className="text-cta">FREE</span> {bonus}
          </div>
        )}

        {/* Product image */}
        <div className="my-4 flex items-center justify-center min-h-[180px]">
          <Image
            src={imageUrl}
            alt={`SlimGovy ${plan}`}
            width={160}
            height={200}
            className="max-h-[200px] w-auto max-w-full object-contain"
          />
        </div>

        {/* Price */}
        <div className="font-outfit text-[48px] font-black text-navy leading-none mt-2">
          {price.dollars}
          {price.cents && <sub className="text-[22px] font-bold align-baseline">{price.cents}</sub>}
          <small className="text-[15px] font-normal text-muted"> {price.unit}</small>
        </div>

        {/* Features */}
        <ul className="mt-4 flex flex-col items-start gap-1 w-fit mx-auto">
          {features.map((feat, i) => (
            <li key={i} className="flex items-start gap-1.5 text-sm font-bold text-navy text-left">
              <CheckIcon />
              <span>
                {feat.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < feat.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA button (pushed to bottom) */}
        <div className="mt-auto pt-5 w-full flex flex-col items-center">
          <a
            href="#"
            className="relative inline-flex items-center justify-center gap-2.5 py-4 px-11 rounded-full bg-cta text-white font-outfit text-[22px] font-black tracking-[0.5px] transition-all hover:bg-cta-hover hover:scale-[1.03]"
          >
            <CartIcon />
            BUY NOW
            {isPopular && (
              <span className="absolute -top-0.5 -right-5 w-12 h-12 pointer-events-none animate-hand-pulse">
                👆
              </span>
            )}
          </a>
          <div className="mt-3 text-sm font-bold text-navy">Only {perServing} / Serving</div>
          <TrustBadges />
        </div>
      </div>
    </div>
  )
}
