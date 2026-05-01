'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type CartItemSummaryItem = {
  id: string
  displayName: string
  basePrice: number
  shippingCost: number
  quantity?: number
  quantityToBuy?: number
  imageUrl?: string
  isMostPopular?: boolean
  [key: string]: unknown
}

type CartItemSummaryMapType = { [key: string]: CartItemSummaryItem }

type CartItemSummaryMapContextType = {
  cartItemSummary: CartItemSummaryMapType
  setValue: (key: string, value: CartItemSummaryItem) => void
  deleteValue: (key: string) => void
  getValue: (key: string) => CartItemSummaryItem | undefined
  clear: () => void
}

const CartItemSummaryMapContext = createContext<CartItemSummaryMapContextType | undefined>(undefined)
const STORAGE_KEY = 'cartItemSummary'

const parseStored = (): CartItemSummaryMapType => {
  try {
    if (typeof window === 'undefined') return {}
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItemSummaryMapType) : {}
  } catch {
    return {}
  }
}

export function CartItemSummaryMapProvider({ children }: { children: ReactNode }) {
  const [cartItemSummary, setCartItemSummary] = useState<CartItemSummaryMapType>(parseStored)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItemSummary)) } catch {}
  }, [cartItemSummary])

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      try { setCartItemSummary(e.newValue ? (JSON.parse(e.newValue) as CartItemSummaryMapType) : {}) } catch {}
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const setValue = (key: string, value: CartItemSummaryItem) =>
    setCartItemSummary((prev) => ({ ...prev, [key]: value }))
  const deleteValue = (key: string) =>
    setCartItemSummary((prev) => { const next = { ...prev }; delete next[key]; return next })
  const getValue = (key: string) => cartItemSummary[key]
  const clear = () => setCartItemSummary({})

  return (
    <CartItemSummaryMapContext.Provider value={{ cartItemSummary, setValue, deleteValue, getValue, clear }}>
      {children}
    </CartItemSummaryMapContext.Provider>
  )
}

export function useCartItemSummaryMap() {
  const ctx = useContext(CartItemSummaryMapContext)
  if (!ctx) throw new Error('useCartItemSummaryMap must be used within a CartItemSummaryMapProvider')
  return ctx
}
