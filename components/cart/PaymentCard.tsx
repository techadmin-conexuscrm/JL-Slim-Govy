'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from './Input'
import { useCartItemSummaryMap } from '@/app/context/cartItemSummaryContext'
import { useOrderBody } from '@/app/context/orderBody'
import { usePurchasedProducts } from '@/app/context/purchasedProductsContext'

interface Props {
  paymentForm: any
  setPaymentForm: (v: any) => void
  handleCreateOrder: (payload: any) => Promise<{ success: boolean; data: { id: string } } | void>
  errors: Record<string, string>
  validate: () => boolean
}

const PaymentCard = ({ paymentForm, setPaymentForm, handleCreateOrder, errors = {}, validate }: Props) => {
  const router = useRouter()
  const { cartItemSummary } = useCartItemSummaryMap()
  const { setOrderBody } = useOrderBody()
  const { addPurchasedProduct } = usePurchasedProducts()

  const [isPaying, setIsPaying] = useState(false)

  const handlePay = async () => {
    if (isPaying) return
    if (validate && !validate()) return
    setIsPaying(true)
    try {
      const cartItem = Object.values(cartItemSummary)[0] as any
      if (!cartItem) {
        console.error('No cart item selected')
        setIsPaying(false)
        return
      }

      const space = paymentForm.fullName.indexOf(' ')
      const firstName = space > 0 ? paymentForm.fullName.slice(0, space) : paymentForm.fullName
      const lastName = space > 0 ? paymentForm.fullName.slice(space + 1) : paymentForm.fullName

      const bodyWithoutProducts = {
        campaignId: process.env.NEXT_PUBLIC_CAMPAIGN_ID || '',
        status: 'completed',
        email: paymentForm.email,
        firstName,
        lastName,
        phoneNumber: paymentForm.phoneNumber,
        organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID || '',
        billingAddress: {
          address1: paymentForm.addressLine1,
          address2: paymentForm.addressLine2,
          city: paymentForm.city,
          state: paymentForm.state,
          country: paymentForm.country,
          postalCode: paymentForm.postalCode,
        },
        shippingAddress: {
          address1: paymentForm.addressLine1,
          address2: paymentForm.addressLine2,
          city: paymentForm.city,
          state: paymentForm.state,
          country: paymentForm.country,
          postalCode: paymentForm.postalCode,
        },
        cardCvv: paymentForm.ccv,
        cardExpMonth: paymentForm.cardExpMonth,
        cardExpYear: paymentForm.cardExpYear,
        cardNumber: paymentForm.cardNumber,
        paymentMethod: 'card',
      }

      setOrderBody(bodyWithoutProducts)

      const body = {
        ...bodyWithoutProducts,
        products: [
          {
            productId: cartItem.id,
            price: cartItem.basePrice ?? 0,
            quantity: cartItem.quantityToBuy ?? cartItem.quantity ?? 1,
            shipping: cartItem.shippingCost ?? 0,
          },
        ],
      }

      const resp = await handleCreateOrder(body)
      if (resp && 'data' in resp && resp.data?.id) {
        localStorage.setItem('orderId', resp.data.id)
      }
      addPurchasedProduct({
        id: cartItem.id,
        displayName: cartItem.displayName || 'SLIMGOVY™',
        basePrice: Number(cartItem.basePrice ?? 0),
        shippingCost: Number(cartItem.shippingCost ?? 0),
        quantity: Number(cartItem.quantityToBuy ?? cartItem.quantity ?? 1),
        imageUrl: cartItem.imageUrl,
      })
      localStorage.removeItem('cartItemSummary')
      sessionStorage.setItem('orderCompleted', 'true')
      router.push('/upgradebottle136')
    } catch (err) {
      console.error(err)
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-[18px] font-bold text-left">Payment</h3>
          <p className="text-[12px] text-[#545454]">All payments are secure and encrypted.</p>
        </div>

        <div className="border border-[#D1D5DB] rounded-[4px] bg-white overflow-hidden">
          <div className="bg-[#EBF5FF] p-3 flex items-center justify-between border-b border-[#D1D5DB]">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-[#2563EB] bg-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></div>
              </div>
              <span className="text-[14px] font-medium text-[#1E1E1E]">Credit card</span>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-3 bg-gray-50">
            <Input placeholder="Card number" autoComplete="off" value={paymentForm.cardNumber} error={errors.cardNumber} onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })} />
            <Input placeholder="Cardholder name" autoComplete="off" value={paymentForm.cardHolderName} error={errors.cardHolderName} onChange={(e) => setPaymentForm({ ...paymentForm, cardHolderName: e.target.value })} />

            <div className="flex gap-3">
              <div className="w-1/2"><Input placeholder="Exp. month (MM)" autoComplete="off" value={paymentForm.cardExpMonth} error={errors.cardExpMonth} onChange={(e) => setPaymentForm({ ...paymentForm, cardExpMonth: e.target.value })} /></div>
              <div className="w-1/2"><Input placeholder="Exp. year (YY)" autoComplete="off" value={paymentForm.cardExpYear} error={errors.cardExpYear} onChange={(e) => setPaymentForm({ ...paymentForm, cardExpYear: e.target.value })} /></div>
            </div>

            <Input placeholder="CVV" autoComplete="off" value={paymentForm.ccv} error={errors.ccv} onChange={(e) => setPaymentForm({ ...paymentForm, ccv: e.target.value })} />

            <button
              onClick={handlePay}
              disabled={isPaying}
              aria-busy={isPaying}
              className="cursor-pointer w-full bg-[#149DCA] hover:bg-[#118AB2] text-white font-bold h-[50px] rounded-[4px] flex items-center justify-center gap-2 mt-2 shadow-[0_4px_0_#0E7490] active:shadow-none active:translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPaying ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[18px]">Processing...</span>
                </>
              ) : (
                <span className="text-[18px]">Place Order</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentCard
