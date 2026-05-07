'use client'

import { ReactNode } from 'react'
import { CartItemSummaryMapProvider } from './cartItemSummaryContext'
import { OffersMapProvider } from './offersContext'
import { OrderBodyProvider } from './orderBody'
import { PurchasedProductsProvider } from './purchasedProductsContext'

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <OffersMapProvider>
      <CartItemSummaryMapProvider>
        <OrderBodyProvider>
          <PurchasedProductsProvider>{children}</PurchasedProductsProvider>
        </OrderBodyProvider>
      </CartItemSummaryMapProvider>
    </OffersMapProvider>
  )
}
