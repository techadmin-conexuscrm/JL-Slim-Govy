'use client'
import { useState, useEffect, useRef } from 'react'
import Input from './Input'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import PaymentCard from './PaymentCard'
import { countries } from '@/lib/offer'
import { useCartItemSummaryMap } from '@/app/context/cartItemSummaryContext'
import { validateCartForm } from './cartFormSchema'

interface Props {
  handleCreateOrder: (payload: any) => Promise<{ success: boolean; data: { id: string } } | void>
}

const LeftComponent = ({ handleCreateOrder }: Props) => {
  const [phoneFocused, setPhoneFocused] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showWarning, setShowWarning] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolderName: '',
    cardExpMonth: '',
    cardExpYear: '',
    ccv: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    country: 'United States of America',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    city: 'New York',
    state: 'NY',
  })

  const validate = () => {
    const newErrors = validateCartForm(paymentForm)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { cartItemSummary } = useCartItemSummaryMap()
  const paymentFormRef = useRef(paymentForm)
  const cartItemSummaryRef = useRef(cartItemSummary)

  useEffect(() => { paymentFormRef.current = paymentForm }, [paymentForm])
  useEffect(() => { cartItemSummaryRef.current = cartItemSummary }, [cartItemSummary])

  // Abandoned-order tracking — fires on visibility change, popstate, pagehide
  useEffect(() => {
    let sent = false

    const shouldSkip = () =>
      sent || sessionStorage.getItem('orderCompleted') === 'true' || !paymentFormRef.current.email

    const buildPayload = () => {
      const form = paymentFormRef.current
      const cartItem = Object.values(cartItemSummaryRef.current || {})[0] as any
      const nameParts = (form.fullName || '').trim().split(' ')
      const firstName = nameParts[0] || 'Unknown'
      const lastName = nameParts.slice(1).join(' ') || firstName
      const address = {
        address1: form.addressLine1 || '',
        address2: form.addressLine2 || '',
        city: form.city || '',
        state: form.state || '',
        postalCode: form.postalCode || '',
        country: form.country || '',
      }
      return {
        status: 'abandoned',
        campaignId: process.env.NEXT_PUBLIC_CAMPAIGN_ID || '',
        organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID || '',
        firstName,
        lastName,
        email: form.email,
        phoneNumber: form.phoneNumber || '',
        billingAddress: address,
        shippingAddress: address,
        paymentMethod: 'card',
        products: cartItem
          ? [{ productId: cartItem.id, quantity: cartItem.quantity ?? 1, price: cartItem.basePrice ?? 0, shipping: cartItem.shippingCost ?? 0 }]
          : [],
      }
    }

    const sendAbandonedOrder = () => {
      if (shouldSkip()) return
      sent = true
      fetch('/api/abandoned-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
        keepalive: true,
      }).catch(() => {})
    }

    const ALERT_MSG = 'Your order is saved!\nYou can continue your purchase anytime.'
    const isLeaving = () => sessionStorage.getItem('orderCompleted') !== 'true'

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendAbandonedOrder()
        setShowWarning(true)
      } else if (document.visibilityState === 'visible') {
        sent = false
      }
    }

    history.pushState(null, '', window.location.pathname + window.location.search)
    const handlePopState = () => {
      if (isLeaving()) {
        window.alert(ALERT_MSG)
        sendAbandonedOrder()
      }
      history.back()
    }

    const handlePageHide = () => sendAbandonedOrder()

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('pagehide', handlePageHide)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [])

  return (
    <div>
      {showWarning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-[#e53935] py-3 text-center">
              <p className="text-white text-[18px] font-extrabold">Wait!</p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-3 text-center">
              <p className="text-[#1a1a1a] text-[15px] font-bold">Your order is saved</p>
              <p className="text-[#555] text-[13px]">You can continue your purchase anytime. Don't lose your offer!</p>
              <button
                onClick={() => setShowWarning(false)}
                className="mt-1 w-full bg-[#149DCA] hover:bg-[#118AB2] transition-colors text-white font-bold py-3 rounded-lg text-[14px]"
              >
                Continue with my order
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-4 mt-4">
          <h3 className="text-[18px] font-bold text-left">Contact</h3>
          <Input
            placeholder="Email*"
            value={paymentForm.email}
            error={errors.email}
            onChange={(e) => setPaymentForm({ ...paymentForm, email: e.target.value })}
          />
          <Input
            placeholder="Full name*"
            value={paymentForm.fullName}
            error={errors.fullName}
            onChange={(e) => setPaymentForm({ ...paymentForm, fullName: e.target.value })}
          />
          <div className="flex flex-col gap-1">
            <div className={`w-full relative rounded-[4px] px-3 pt-4 pb-1 flex flex-col border transition-colors ${errors.phoneNumber ? 'border-[#D32F2F]' : phoneFocused ? 'border-2 border-blue-900' : 'border border-black'}`}>
              <span className={`absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-[11px] transition-colors ${errors.phoneNumber ? 'text-[#D32F2F]' : phoneFocused ? 'text-blue-900 font-medium' : 'text-black'}`}>
                Phone number*
              </span>
              <PhoneInput
                placeholder="(201) 555-0123"
                defaultCountry="US"
                international
                className="custom-phone-input"
                value={paymentForm.phoneNumber}
                onChange={(value) => setPaymentForm((prev) => ({ ...prev, phoneNumber: (value as string) || '' }))}
                onFocus={() => setPhoneFocused(true)}
                onBlur={() => setPhoneFocused(false)}
              />
            </div>
            {errors.phoneNumber && <p className="text-[#D32F2F] text-[12px] mt-1 text-left font-medium">{errors.phoneNumber}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-[18px] font-bold text-left">Delivery</h3>

          <div className="w-full h-[50px] border border-[#9CA3AF] rounded-[4px] px-4 flex justify-between items-center cursor-pointer relative group transition-colors">
            <span className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-[11px] text-gray-500 font-medium">
              Country*
            </span>
            <div className="flex flex-col items-start leading-none gap-1 w-full relative">
              <select
                value={paymentForm.country}
                onChange={(e) => setPaymentForm({ ...paymentForm, country: e.target.value })}
                className="w-full text-[14px] text-[#1E1E1E] bg-transparent outline-none appearance-none cursor-pointer p-0 m-0 border-none"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          <Input placeholder="Address" value={paymentForm.addressLine1} error={errors.addressLine1} onChange={(e) => setPaymentForm({ ...paymentForm, addressLine1: e.target.value })} />
          <Input placeholder="Apartment, suite, etc. (optional)" value={paymentForm.addressLine2} onChange={(e) => setPaymentForm({ ...paymentForm, addressLine2: e.target.value })} />

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-1/3"><Input placeholder="Postal code*" value={paymentForm.postalCode} error={errors.postalCode} onChange={(e) => setPaymentForm({ ...paymentForm, postalCode: e.target.value })} /></div>
            <div className="w-full sm:w-1/3"><Input placeholder="City*" value={paymentForm.city} error={errors.city} onChange={(e) => setPaymentForm({ ...paymentForm, city: e.target.value })} /></div>
            <div className="w-full sm:w-1/3"><Input placeholder="State*" value={paymentForm.state} error={errors.state} onChange={(e) => setPaymentForm({ ...paymentForm, state: e.target.value })} /></div>
          </div>
        </div>

        <PaymentCard
          paymentForm={paymentForm}
          setPaymentForm={setPaymentForm}
          handleCreateOrder={handleCreateOrder}
          errors={errors}
          validate={validate}
        />
      </div>
    </div>
  )
}

export default LeftComponent
