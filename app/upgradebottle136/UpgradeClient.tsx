'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartItemSummaryMap } from '@/app/context/cartItemSummaryContext'
import { useOrderBody } from '@/app/context/orderBody'
import { usePurchasedProducts } from '@/app/context/purchasedProductsContext'
import { clinicalUpgradeOfferId, normalOfferId, getClinicalUpgradeImageUrlByQuantity } from '@/lib/offer'

interface Props {
  handleCreateOrder: (payload: any) => Promise<any>
  handleCancelOrder: (orderId: string) => Promise<any>
}

const UpgradeClient = ({ handleCreateOrder, handleCancelOrder }: Props) => {
  const router = useRouter()
  const { cartItemSummary, setValue, deleteValue } = useCartItemSummaryMap()
  const { orderBody } = useOrderBody()
  const { addPurchasedProduct, removePurchasedProduct } = usePurchasedProducts()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const normalItem = (cartItemSummary[normalOfferId] || Object.values(cartItemSummary)[0]) as any
  const quantityToBuy = normalItem?.quantityToBuy ?? normalItem?.quantity ?? 1
  const clinicalPriceByQty: Record<number, number> = { 3: 59, 6: 49, 12: 39 }
  const displayPrice = clinicalPriceByQty[quantityToBuy] ?? Number(normalItem?.basePrice ?? 0)

  const handleClinicalUpgrade = async () => {
    if (isSubmitting) return
    if (!orderBody) {
      console.error('Missing order body for upgrade')
      return
    }
    setIsSubmitting(true)
    try {
      const upgradedItem = {
        ...(normalItem || {}),
        id: clinicalUpgradeOfferId,
        displayName: normalItem?.displayName ?? 'SLIMGOVY™ Clinical Strength',
        basePrice: displayPrice,
        shippingCost: Number(normalItem?.shippingCost ?? 0),
        imageUrl: getClinicalUpgradeImageUrlByQuantity(quantityToBuy),
        quantityToBuy,
        quantity: quantityToBuy,
      }

      setValue(clinicalUpgradeOfferId, upgradedItem)
      if (normalItem?.id && normalItem.id !== clinicalUpgradeOfferId) deleteValue(normalItem.id)

      const body = {
        ...orderBody,
        products: [{ productId: clinicalUpgradeOfferId, price: upgradedItem.basePrice, quantity: quantityToBuy, shipping: upgradedItem.shippingCost }],
      }

      await handleCreateOrder(body)

      const originalOrderId = localStorage.getItem('orderId')
      if (originalOrderId) {
        try {
          await handleCancelOrder(originalOrderId)
          localStorage.removeItem('orderId')
          if (normalItem?.id) removePurchasedProduct(normalItem.id)
        } catch (cancelErr) {
          console.error('Cancel original order failed:', cancelErr)
        }
      }

      addPurchasedProduct({
        id: clinicalUpgradeOfferId,
        displayName: upgradedItem.displayName,
        basePrice: Number(upgradedItem.basePrice ?? 0),
        shippingCost: Number(upgradedItem.shippingCost ?? 0),
        quantity: Number(quantityToBuy ?? 1),
        imageUrl: upgradedItem.imageUrl,
      })

      router.push('/yestoupgrade')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 py-12 font-dm-sans">
        <h1 className="text-3xl font-bold text-center text-navy mb-4">Wait — Upgrade Your Order</h1>
        <p className="text-[#1E1E1E] text-[16px] sm:text-[20px] text-center font-medium leading-relaxed mb-8">
          <span className="font-bold">Please Note:</span> This option upgrades every bottle in your order from
          Regular Strength to <span className="font-bold">Clinical Strength</span> for only{' '}
          <span className="font-bold">${displayPrice}</span> each.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 border-2 border-[#149DCA]">
          <ul className="flex flex-col gap-2 text-[15px]">
            <li>✅ 100% Certified Drug-Free</li>
            <li>✅ 2X the power, <span className="line-through text-gray-400">$147</span> ${displayPrice} per bottle</li>
            <li>✅ Free shipping included</li>
            <li>✅ Sold ONLY on this page</li>
            <li>✅ Money-back guarantee</li>
          </ul>
        </div>

        <button
          onClick={handleClinicalUpgrade}
          disabled={isSubmitting}
          className="w-full bg-[#149DCA] hover:bg-[#118AB2] text-white font-bold py-4 px-6 rounded-lg text-[18px] sm:text-[20px] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_0_#0E7490] active:shadow-none active:translate-y-1 transition-all"
        >
          {isSubmitting ? 'Processing...' : `YES! UPGRADE MY ORDER TO CLINICAL STRENGTH ($${displayPrice}/bottle)`}
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/notoupgrade')}
            disabled={isSubmitting}
            className="text-[#9CA3AF] underline hover:text-[#6B7280] text-[16px] font-medium disabled:opacity-60"
          >
            No thanks, I don't want 200% more potency
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpgradeClient
