'use server'

import { createOrder } from '@/lib/apis/createOrder'

export async function createYesUpgradeOrder(orderPayload: any) {
  try {
    return await createOrder(orderPayload, process.env.API_KEY || '')
  } catch (error) {
    console.error(error)
    throw error
  }
}
