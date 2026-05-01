'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartItemSummaryMap } from '@/app/context/cartItemSummaryContext'
import { useOrderBody } from '@/app/context/orderBody'
import { usePurchasedProducts } from '@/app/context/purchasedProductsContext'
import { normalOfferId } from '@/lib/offer'
import { createNoUpgradeOrder } from './actions'

const NoToUpgrade = () => {
  const router = useRouter()
  const { cartItemSummary, setValue } = useCartItemSummaryMap()
  const { orderBody, clearOrderBody } = useOrderBody()
  const { addPurchasedProduct } = usePurchasedProducts()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const normalItem = (cartItemSummary[normalOfferId] || Object.values(cartItemSummary)[0]) as any
  const currentQty = normalItem?.quantityToBuy ?? normalItem?.quantity ?? 1
  const targetQty = currentQty >= 6 ? 12 : 6
  const todayPricePerBottle = 29
  const todayTotal = todayPricePerBottle * targetQty

  const handleAccept = async () => {
    if (isSubmitting) return
    if (!normalItem || !orderBody) {
      console.error('Missing item or order body')
      return
    }
    setIsSubmitting(true)
    try {
      const upgradedItem = {
        ...normalItem,
        id: normalOfferId,
        basePrice: todayPricePerBottle,
        shippingCost: Number(normalItem.shippingCost ?? 0),
        quantity: targetQty,
        quantityToBuy: targetQty,
      }
      setValue(normalOfferId, upgradedItem)

      const body = {
        ...orderBody,
        products: [{ productId: normalOfferId, price: todayPricePerBottle, quantity: targetQty, shipping: upgradedItem.shippingCost }],
      }

      await createNoUpgradeOrder(body)
      addPurchasedProduct({
        id: normalOfferId,
        displayName: upgradedItem.displayName || 'SLIMGOVY™',
        basePrice: todayPricePerBottle,
        shippingCost: Number(upgradedItem.shippingCost ?? 0),
        quantity: targetQty,
        imageUrl: upgradedItem.imageUrl,
      })
      clearOrderBody()
      router.push('/thankyou')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 font-dm-sans">
        <h1 className="text-3xl font-bold text-center text-navy mb-4">Wait — Family & Friends Discount</h1>
        <p className="text-[16px] sm:text-[18px] text-center mb-8">
          Add <span className="font-bold">{targetQty} bottles</span> for only{' '}
          <span className="font-bold">${todayPricePerBottle}</span> each — total{' '}
          <span className="font-bold">${todayTotal}</span>.
        </p>

        <button
          onClick={handleAccept}
          disabled={isSubmitting}
          className="w-full bg-[#149DCA] hover:bg-[#118AB2] text-white font-bold py-4 px-6 rounded-lg text-[18px] disabled:opacity-60 transition-all shadow-[0_4px_0_#0E7490] active:shadow-none active:translate-y-1"
        >
          {isSubmitting ? 'Processing...' : `YES! ADD ${targetQty} BOTTLES AT $${todayPricePerBottle} EACH`}
        </button>

        <div className="mt-6 text-center">
          <button onClick={() => router.push('/thankyou')} disabled={isSubmitting} className="text-[#9CA3AF] underline hover:text-[#6B7280] text-[14px]">
            No thanks, take me to my order
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoToUpgrade
