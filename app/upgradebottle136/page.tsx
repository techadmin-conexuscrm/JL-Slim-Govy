import { createOrder } from '@/lib/apis/createOrder'
import { cancelOrder } from '@/lib/apis/cancelOrder'
import UpgradeClient from './UpgradeClient'

const UpgradeBottle136 = async () => {
  const handleCreateOrder = async (orderPayload: any) => {
    'use server'
    try {
      return await createOrder(orderPayload, process.env.API_KEY || '')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleCancelOrder = async (orderId: string) => {
    'use server'
    try {
      return await cancelOrder(orderId, process.env.API_KEY || '')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return <UpgradeClient handleCreateOrder={handleCreateOrder} handleCancelOrder={handleCancelOrder} />
}

export default UpgradeBottle136
