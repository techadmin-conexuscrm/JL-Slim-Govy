import type { Address, Order } from '../types'
import { api, extractErrorMessage } from '../axios'

export interface ProductOrder {
  productId: string
  quantity: number
  price: number
  shipping: number
}

export interface CreateOrderPayload {
  status?: string
  campaignId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  organizationId: string
  products: ProductOrder[]
  billingAddress: Address
  shippingAddress: Address
  paymentMethod: string
  cardNumber?: string
  cardCvv?: string
  cardExpMonth?: string
  cardExpYear?: string
  assignedTo?: string
}

export async function createOrder(payload: CreateOrderPayload, apiKey: string) {
  try {
    const response = await api.post(`/api/v1/orders?api_key=${apiKey}`, payload)
    return response.data as { success: boolean; data: Order }
  } catch (error) {
    throw extractErrorMessage(error)
  }
}
