"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import TrustBadges from "./TrustBadges";
import { useCartItemSummaryMap } from "@/app/context/cartItemSummaryContext";
import { useOffersMap } from "@/app/context/offersContext";
import { normalOfferId } from "@/lib/offer";

const CartIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2.5"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="#00da98"
    className="flex-shrink-0 mt-0.5"
  >
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const badgeStyles: Record<Product["badge"], string> = {
  basic: "bg-[#607d8b]",
  popular: "bg-sg-pink",
  bundle: "bg-sg-magenta",
};

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { setValue, clear } = useCartItemSummaryMap();
  const { setOffer } = useOffersMap();

  const {
    id,
    label,
    badge,
    plan,
    supply,
    imageUrl,
    bonus,
    price,
    features,
    perServing,
    isPopular,
  } = product;

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    // Single-product cart: clear any prior selection, then add this one.
    clear();
    // Use the live offer ID if mapped from API, otherwise fall back to the configured normalOfferId.
    const offerId = product.offerId ?? id ?? normalOfferId;
    const basePrice =
      product.basePrice ??
      Number(price.dollars.replace(/[^\d.]/g, "")) +
        (price.cents ? Number(price.cents) : 0);
    const shippingCost = product.shippingCost ?? 0;
    const quantityToBuy =
      product.quantityToBuy ??
      (plan.match(/(\d+)/)?.[1] ? Number(plan.match(/(\d+)/)![1]) : 1);

    const cartItem = {
      id: offerId,
      displayName: `SLIMGOVY™ ${plan}`,
      basePrice,
      shippingCost,
      quantityToBuy,
      quantity: quantityToBuy,
      imageUrl,
    };
    setValue(offerId, cartItem);
    setOffer(offerId, {
      id: offerId,
      displayName: cartItem.displayName,
      basePrice,
      shippingCost,
    });
    router.push("/cart");
  };

  return (
    <div
      className={`rounded-2xl overflow-hidden border-2 border-border-gray bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(13,50,82,0.12)] flex flex-col cursor-pointer ${isPopular ? "card-popular" : ""}`}
    >
      <div
        className={`text-center py-2.5 px-4 font-outfit font-black text-sm tracking-[1.5px] uppercase text-white ${badgeStyles[badge]}`}
      >
        {label}
      </div>

      <div className="px-5 pb-7 pt-6 text-center flex-1 flex flex-col items-center">
        <div className="font-outfit text-[26px] font-black text-navy uppercase">
          {plan}
        </div>
        <div className="text-[15px] text-muted mt-0.5">{supply}</div>

        {bonus && (
          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-navy text-white text-[13px] font-bold">
            <span className="text-cta">FREE</span> {bonus}
          </div>
        )}

        <div className="my-4 flex items-center justify-center min-h-[180px]">
          <Image
            src={imageUrl}
            alt={`SlimGovy ${plan}`}
            width={160}
            height={200}
            className="max-h-[200px] w-auto max-w-full object-contain"
          />
        </div>

        <div className="font-outfit text-[48px] font-black text-navy leading-none mt-2">
          {price.dollars}
          {price.cents && (
            <sub className="text-[22px] font-bold align-baseline">
              {price.cents}
            </sub>
          )}
          <small className="text-[15px] font-normal text-muted">
            {" "}
            {price.unit}
          </small>
        </div>

        <ul className="mt-4 flex flex-col items-start gap-1 w-fit mx-auto">
          {features.map((feat, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-sm font-bold text-navy text-left"
            >
              <CheckIcon />
              <span>
                {feat.split("\n").map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < feat.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5 w-full flex flex-col items-center">
          <button
            onClick={handleBuy}
            className="relative inline-flex items-center justify-center gap-2.5 py-4 px-11 rounded-full bg-cta text-white font-outfit text-[22px] font-black tracking-[0.5px] transition-all hover:bg-cta-hover hover:scale-[1.03] cursor-pointer border-none"
          >
            <CartIcon />
            BUY NOW
          </button>
          <div className="mt-3 text-sm font-bold text-navy">
            Only {perServing} / Serving
          </div>
          <TrustBadges />
        </div>
      </div>
    </div>
  );
}
