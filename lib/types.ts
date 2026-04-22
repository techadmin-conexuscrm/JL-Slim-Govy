export interface Price {
  dollars: string
  cents?: string
  unit: string
}

export interface Product {
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
}

export interface Comment {
  id: string
  name: string
  avatarId: number
  messages: string[]
  timeAgo: string
  reactions: string
  isReply: boolean
}
