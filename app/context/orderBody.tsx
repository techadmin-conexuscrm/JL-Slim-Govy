'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type OrderAddress = {
  address1: string
  address2: string
  city: string
  state: string
  country: string
  postalCode: string
}

export type OrderBodyWithoutProducts = {
  campaignId: string
  status: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  organizationId: string
  billingAddress: OrderAddress
  shippingAddress: OrderAddress
  cardCvv: string
  cardExpMonth: string
  cardExpYear: string
  cardNumber: string
  paymentMethod: string
}

type OrderBodyContextType = {
  orderBody: OrderBodyWithoutProducts | null
  setOrderBody: (value: OrderBodyWithoutProducts) => void
  clearOrderBody: () => void
}

const OrderBodyContext = createContext<OrderBodyContextType | undefined>(undefined)
const STORAGE_KEY = 'orderBody'

const parseStored = (): OrderBodyWithoutProducts | null => {
  try {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as OrderBodyWithoutProducts) : null
  } catch {
    return null
  }
}

export function OrderBodyProvider({ children }: { children: ReactNode }) {
  const [orderBody, setOrderBodyState] = useState<OrderBodyWithoutProducts | null>(parseStored)

  useEffect(() => {
    try {
      if (!orderBody) { localStorage.removeItem(STORAGE_KEY); return }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orderBody))
    } catch {}
  }, [orderBody])

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      try { setOrderBodyState(e.newValue ? (JSON.parse(e.newValue) as OrderBodyWithoutProducts) : null) } catch {}
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  return (
    <OrderBodyContext.Provider value={{ orderBody, setOrderBody: setOrderBodyState, clearOrderBody: () => setOrderBodyState(null) }}>
      {children}
    </OrderBodyContext.Provider>
  )
}

export function useOrderBody() {
  const ctx = useContext(OrderBodyContext)
  if (!ctx) throw new Error('useOrderBody must be used within an OrderBodyProvider')
  return ctx
}
