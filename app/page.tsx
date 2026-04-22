import { getOneTimeProducts, getSubscriptionProducts } from '@/lib/api'
import ArrowSection from '@/components/ArrowSection'
import FbComments from '@/components/FbComments'
import Footer from '@/components/Footer'
import HealthBanner from '@/components/HealthBanner'
import Logos from '@/components/Logos'
import OrderSection from '@/components/OrderSection'
import Ticker from '@/components/Ticker'
import VideoPlaceholder from '@/components/VideoPlaceholder'

// Server Component — product data is fetched here, never reaches the client bundle
export default async function Page() {
  const [subProducts, otProducts] = await Promise.all([
    getSubscriptionProducts(),
    getOneTimeProducts(),
  ])

  return (
    <main>
      <HealthBanner />
      <Ticker />
      <VideoPlaceholder />
      <Logos />
      <ArrowSection />
      <OrderSection subProducts={subProducts} otProducts={otProducts} />
      <FbComments />
      <Footer />
    </main>
  )
}
