// UI types (existing — keep for landing page)
export interface Price {
  dollars: string
  cents?: string
  unit: string
}

export interface UIProduct {
  id: string
  label: string
  badge: 'basic' | 'popular' | 'bundle'
  plan: string
  supply: string
  imageUrl: string
  bonus?: string
  price: Price
  features: string[]
  perServing: string
  isPopular?: boolean
  // populated when mapped from a real Conexus offer
  offerId?: string
  basePrice?: number
  shippingCost?: number
  quantityToBuy?: number
}

// Backwards-compatible alias used by landing components
export type Product = UIProduct

export interface Comment {
  id: string
  name: string
  avatarId: number
  messages: string[]
  timeAgo: string
  reactions: string
  isReply: boolean
}

// Conexus API types (mirror Slim-govy/app/types)
export interface Address {
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type ApiProduct = {
  id: string
  name: string
  productCost: number
  shippingCost?: number | null
}

export type Offer<WithProduct extends boolean = false> = {
  id: string
  displayName: string
  quantity: number | null
  basePrice: string
  shipPrice: string | null
  minPrice: string | null
  maxPrice: string | null
  maxQuantity: number | null
  product: WithProduct extends true ? ApiProduct : never
  productId: string
  gatewayInstanceId: string
  quantityPerOrder: number | null
}

export type OrderStatus =
  | 'completed'
  | 'partial'
  | 'canceled'
  | 'partially_refunded'
  | 'refunded'
  | 'payment_pending'
  | 'payment_failed'
  | 'awaiting_recording'
  | 'review_in_progress'
  | 'review_required'
  | 'abandoned'

export type Order = {
  id: string
  orderId: string
  firstName: string
  lastName: string
  status: OrderStatus
  email: string | null
  phone: string | null
  itemTotal: number
  shippingTotal: number
  taxTotal: number | null
  grandTotal: number | null
  shippingAddress: Address
  billingAddress: Address
  campaignId: string
  createdAt: string
  updatedAt: string
}
