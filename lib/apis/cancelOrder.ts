import type { Order } from '../types'
import { api, extractErrorMessage } from '../axios'

export async function cancelOrder(orderId: string, apiKey: string) {
  try {
    const response = await api.post(`/api/v1/orders/${orderId}/cancel?api_key=${apiKey}`)
    return response.data as { success: boolean; data: Order }
  } catch (error) {
    throw extractErrorMessage(error)
  }
}
