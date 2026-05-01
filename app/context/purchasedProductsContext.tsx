'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type PurchasedProduct = {
  id: string
  displayName: string
  basePrice: number
  shippingCost: number
  quantity: number
  imageUrl?: string
  regularPrice?: number
  compareAtPrice?: number
  [key: string]: unknown
}

type PurchasedProductsContextType = {
  purchasedProducts: PurchasedProduct[]
  addPurchasedProduct: (product: PurchasedProduct) => void
  addPurchasedProducts: (products: PurchasedProduct[]) => void
  removePurchasedProduct: (productId: string) => void
  clearPurchasedProducts: () => void
}

const PurchasedProductsContext = createContext<PurchasedProductsContextType | undefined>(undefined)
const STORAGE_KEY = 'purchasedProducts'

const parseStored = (): PurchasedProduct[] => {
  try {
    if (typeof window === 'undefined') return []
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as PurchasedProduct[]) : []
  } catch {
    return []
  }
}

const mergeProduct = (current: PurchasedProduct[], incoming: PurchasedProduct): PurchasedProduct[] => {
  const index = current.findIndex((item) => item.id === incoming.id)
  if (index < 0) return [...current, incoming]
  const next = [...current]
  next[index] = { ...next[index], ...incoming, quantity: (next[index].quantity ?? 0) + (incoming.quantity ?? 0) }
  return next
}

export function PurchasedProductsProvider({ children }: { children: ReactNode }) {
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>(parseStored)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(purchasedProducts)) } catch {}
  }, [purchasedProducts])

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      try { setPurchasedProducts(e.newValue ? (JSON.parse(e.newValue) as PurchasedProduct[]) : []) } catch {}
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const addPurchasedProduct = (product: PurchasedProduct) =>
    setPurchasedProducts((prev) => mergeProduct(prev, product))
  const addPurchasedProducts = (products: PurchasedProduct[]) =>
    setPurchasedProducts((prev) => products.reduce((acc, p) => mergeProduct(acc, p), prev))
  const removePurchasedProduct = (productId: string) =>
    setPurchasedProducts((prev) => prev.filter((p) => p.id !== productId))
  const clearPurchasedProducts = () => setPurchasedProducts([])

  return (
    <PurchasedProductsContext.Provider value={{ purchasedProducts, addPurchasedProduct, addPurchasedProducts, removePurchasedProduct, clearPurchasedProducts }}>
      {children}
    </PurchasedProductsContext.Provider>
  )
}

export function usePurchasedProducts() {
  const ctx = useContext(PurchasedProductsContext)
  if (!ctx) throw new Error('usePurchasedProducts must be used within a PurchasedProductsProvider')
  return ctx
}
