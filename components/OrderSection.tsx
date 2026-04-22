'use client'

import { useState } from 'react'
import type { Product } from '@/lib/types'
import ProductCard from './ProductCard'

type Tab = 'sub' | 'ot'

interface OrderSectionProps {
  subProducts: Product[]
  otProducts: Product[]
}

export default function OrderSection({ subProducts, otProducts }: OrderSectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>('sub')

  const products = activeTab === 'sub' ? subProducts : otProducts

  return (
    <section id="order-now" className="py-12 pb-10 bg-off-white">
      <div className="w-full max-w-page mx-auto px-5">
        {/* Toggle */}
        <div className="flex justify-center mb-9">
          <div className="inline-flex rounded-full overflow-hidden border-2 border-navy">
            {([['sub', 'Subscribe & Save'], ['ot', 'One-time Purchase']] as [Tab, string][]).map(
              ([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-7 text-[15px] font-bold font-outfit transition-all duration-200 border-none cursor-pointer ${
                    activeTab === tab
                      ? 'bg-navy text-white'
                      : 'bg-transparent text-navy'
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-5 items-stretch max-[767px]:grid-cols-1 max-[767px]:max-w-[420px] max-[767px]:mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
