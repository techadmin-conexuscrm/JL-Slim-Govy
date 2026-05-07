'use client'
import { useCartItemSummaryMap } from '@/app/context/cartItemSummaryContext'

const OrderSummary = () => {
  const { cartItemSummary } = useCartItemSummaryMap()
  const items = Object.values(cartItemSummary).filter((i: any) => (i.quantity ?? i.quantityToBuy ?? 0) > 0) as any[]
  const item = items[0]
  const qty = item ? Number(item.quantityToBuy ?? item.quantity ?? 1) : 0
  const pricePerBottle = item ? Number(item.basePrice ?? 0) : 0
  const shipping = item ? Number(item.shippingCost ?? 0) : 0
  const subtotal = pricePerBottle * qty
  const total = subtotal + shipping

  return (
    <div className="w-full font-dm-sans">
      {items.map((it: any) => (
        <div key={it.id} className="flex gap-4 mb-6">
          <div className="w-[80px] h-[80px] bg-white border border-[#E5E5E5] rounded-[4px] flex items-center justify-center shrink-0 p-1">
            {it.imageUrl && <img src={it.imageUrl} alt={it.displayName} className="w-full h-full object-contain" />}
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h3 className="text-[#149DCA] text-[16px] font-bold leading-snug">{it.displayName}</h3>
            <p className="text-[#1E1E1E] text-[14px]">Quantity: {qty}</p>
            <p className="text-[#1E1E1E] text-[16px] font-medium">
              ${pricePerBottle.toFixed(2)}<span className="text-[#1e1e1e]"> / bottle</span>
            </p>
          </div>
        </div>
      ))}

      <hr className="border-[#E5E5E5] mb-4" />

      <div className="flex flex-col gap-3 text-[14px] text-[#1E1E1E] mb-4">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span className="text-[16px] font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span className="text-[16px] font-bold">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Tax</span>
          <span className="text-[16px] font-bold">$0.00</span>
        </div>
        <hr className="border-[#E5E5E5]" />
        <div className="flex justify-between items-center">
          <span className="font-bold">Total</span>
          <span className="text-[20px] font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
