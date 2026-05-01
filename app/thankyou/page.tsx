'use client'
import { useEffect } from 'react'
import { usePurchasedProducts } from '@/app/context/purchasedProductsContext'
import { useOrderBody } from '@/app/context/orderBody'

const Thankyou = () => {
  const { purchasedProducts, clearPurchasedProducts } = usePurchasedProducts()
  const { orderBody, clearOrderBody } = useOrderBody()

  useEffect(() => {
    try { localStorage.removeItem('cartItemSummary') } catch {}
  }, [])

  useEffect(() => {
    return () => {
      try { localStorage.removeItem('purchasedProducts') } catch {}
    }
  }, [])

  const subtotal = purchasedProducts.reduce((acc, p) => acc + p.basePrice * p.quantity, 0)
  const shipping = purchasedProducts.reduce((acc, p) => acc + (p.shippingCost ?? 0), 0)
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 font-dm-sans">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-navy mb-2">Thank You for Your Order!</h1>
          <p className="text-[#555] text-[16px]">A confirmation has been sent to {orderBody?.email || 'your email'}.</p>
        </div>

        <div className="border border-[#E5E5E5] rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {purchasedProducts.length === 0 && <p className="text-[#777]">No items recorded.</p>}
          {purchasedProducts.map((p) => (
            <div key={p.id} className="flex justify-between items-center py-2 border-b last:border-0 border-[#E5E5E5]">
              <div>
                <p className="font-bold">{p.displayName}</p>
                <p className="text-[14px] text-[#777]">Qty: {p.quantity}</p>
              </div>
              <div className="font-bold">${(p.basePrice * p.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div className="flex justify-between mt-4 text-[14px]">
            <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span>Shipping</span><span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-[#E5E5E5] font-bold text-[18px]">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </div>

        {orderBody && (
          <div className="border border-[#E5E5E5] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Shipping To</h2>
            <p>{orderBody.firstName} {orderBody.lastName}</p>
            <p>{orderBody.shippingAddress.address1}</p>
            {orderBody.shippingAddress.address2 && <p>{orderBody.shippingAddress.address2}</p>}
            <p>{orderBody.shippingAddress.city}, {orderBody.shippingAddress.state} {orderBody.shippingAddress.postalCode}</p>
            <p>{orderBody.shippingAddress.country}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Thankyou
