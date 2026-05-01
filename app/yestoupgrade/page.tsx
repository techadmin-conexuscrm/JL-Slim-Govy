'use client'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartItemSummaryMap } from '@/app/context/cartItemSummaryContext'
import { useOrderBody } from '@/app/context/orderBody'
import { usePurchasedProducts } from '@/app/context/purchasedProductsContext'
import { clinicalUpgradeOfferId } from '@/lib/offer'
import { createYesUpgradeOrder } from './actions'

const YesToUpgrade = () => {
  const router = useRouter()
  const { cartItemSummary, setValue } = useCartItemSummaryMap()
  const { orderBody } = useOrderBody()
  const { addPurchasedProduct } = usePurchasedProducts()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { upgradeQuantity, pricePerBottle, totalPrice } = useMemo(() => {
    const item = cartItemSummary[clinicalUpgradeOfferId] as any
    const currentQty = item?.quantityToBuy ?? item?.quantity ?? 1
    if (currentQty === 6) return { upgradeQuantity: 12, pricePerBottle: 39, totalPrice: 39 * 12 }
    return { upgradeQuantity: 6, pricePerBottle: 49, totalPrice: 49 * 6 }
  }, [cartItemSummary])

  const handleUpgrade = async () => {
    if (isSubmitting) return
    const item = cartItemSummary[clinicalUpgradeOfferId] as any
    if (!item || !orderBody) {
      console.error('Missing upgrade item or order body')
      return
    }

    setIsSubmitting(true)
    try {
      const upgradedItem = {
        ...item,
        quantityToBuy: upgradeQuantity,
        quantity: upgradeQuantity,
        basePrice: pricePerBottle,
      }
      setValue(clinicalUpgradeOfferId, upgradedItem)

      const body = {
        ...orderBody,
        products: [{ productId: upgradedItem.id, price: upgradedItem.basePrice, quantity: upgradeQuantity, shipping: Number(upgradedItem.shippingCost ?? 0) }],
      }

      await createYesUpgradeOrder(body)
      addPurchasedProduct({
        id: upgradedItem.id,
        displayName: upgradedItem.displayName || 'SLIMGOVY™',
        basePrice: Number(upgradedItem.basePrice ?? 0),
        shippingCost: Number(upgradedItem.shippingCost ?? 0),
        quantity: Number(upgradeQuantity ?? 1),
        imageUrl: upgradedItem.imageUrl,
      })
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
        <h1 className="text-3xl font-bold text-center text-navy mb-4">Last Chance — Stock Up & Save More</h1>
        <p className="text-[16px] sm:text-[18px] text-center mb-8">
          Add <span className="font-bold">{upgradeQuantity} bottles</span> for only{' '}
          <span className="font-bold">${pricePerBottle}</span> each — total{' '}
          <span className="font-bold">${totalPrice}</span>.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 border-2 border-[#149DCA]">
          <ul className="flex flex-col gap-2 text-[15px]">
            <li>✅ Free Shipping</li>
            <li>✅ Stock up — no risk of running out</li>
            <li>✅ Money-back guarantee</li>
          </ul>
        </div>

        <button
          onClick={handleUpgrade}
          disabled={isSubmitting}
          className="w-full bg-[#149DCA] hover:bg-[#118AB2] text-white font-bold py-4 px-6 rounded-lg text-[18px] disabled:opacity-60 transition-all shadow-[0_4px_0_#0E7490] active:shadow-none active:translate-y-1"
        >
          {isSubmitting ? 'Processing...' : `YES! UPGRADE TO ${upgradeQuantity} BOTTLES`}
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

export default YesToUpgrade
