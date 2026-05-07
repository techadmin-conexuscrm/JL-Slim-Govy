import LeftComponent from '@/components/cart/LeftComponent'
import OrderSummary from '@/components/cart/OrderSummary'
import { createOrder } from '@/lib/apis/createOrder'

const Cart = async () => {
  const handleCreateOrder = async (orderPayload: any) => {
    'use server'
    try {
      return await createOrder(orderPayload, process.env.API_KEY || '')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-24 py-4 font-dm-sans">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1">
            <LeftComponent handleCreateOrder={handleCreateOrder} />
          </div>
          <div className="hidden lg:block w-px bg-[#E5E5E5]"></div>
          <div className="w-full lg:w-[400px] shrink-0">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
