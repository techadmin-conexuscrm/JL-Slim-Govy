'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type OfferItem = {
  id: string
  displayName: string
  basePrice: number
  shippingCost: number
  [key: string]: unknown
}

type OffersMapType = { [key: string]: OfferItem }

type OffersMapContextType = {
  offersMap: OffersMapType
  setOffer: (key: string, value: OfferItem) => void
  deleteOffer: (key: string) => void
  getOffer: (key: string) => OfferItem | undefined
  clearOffers: () => void
}

const OffersMapContext = createContext<OffersMapContextType | undefined>(undefined)
const STORAGE_KEY = 'offersMap'

const parseStored = (): OffersMapType => {
  try {
    if (typeof window === 'undefined') return {}
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as OffersMapType) : {}
  } catch {
    return {}
  }
}

export function OffersMapProvider({ children }: { children: ReactNode }) {
  const [offersMap, setOffersMap] = useState<OffersMapType>(parseStored)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(offersMap)) } catch {}
  }, [offersMap])

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      try { setOffersMap(e.newValue ? (JSON.parse(e.newValue) as OffersMapType) : {}) } catch {}
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const setOffer = (key: string, value: OfferItem) =>
    setOffersMap((prev) => ({ ...prev, [key]: value }))
  const deleteOffer = (key: string) =>
    setOffersMap((prev) => { const next = { ...prev }; delete next[key]; return next })
  const getOffer = (key: string) => offersMap[key]
  const clearOffers = () => setOffersMap({})

  return (
    <OffersMapContext.Provider value={{ offersMap, setOffer, deleteOffer, getOffer, clearOffers }}>
      {children}
    </OffersMapContext.Provider>
  )
}

export function useOffersMap() {
  const ctx = useContext(OffersMapContext)
  if (!ctx) throw new Error('useOffersMap must be used within an OffersMapProvider')
  return ctx
}
