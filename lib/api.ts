import type { Comment, UIProduct, Offer } from './types'
import { searchResources } from './apis/search'
import { normalOfferId, clinicalUpgradeOfferId } from './offer'

// Tier pricing per bottle (matches Slim-govy's UI tiers).
// Conexus returns one "Normal bottle" offer; we render it as three quantity tiers.
const TIERS: Array<{
  qty: number
  pricePerBottle: number
  badge: UIProduct['badge']
  label: string
  isPopular?: boolean
  bonus?: string
  features: string[]
  imageUrl: string
}> = [
  {
    qty: 1,
    pricePerBottle: 79,
    badge: 'basic',
    label: 'BASIC',
    features: ['NATURAL FORMULA', 'FAST SHIPPING'],
    imageUrl: '/images/bottle-1.png',
  },
  {
    qty: 6,
    pricePerBottle: 49,
    badge: 'popular',
    label: 'MOST POPULAR',
    isPopular: true,
    bonus: 'Digital Weight Loss Content',
    features: ['7 FREE BONUSES\n($1549 VALUE)', 'FREE SHIPPING', 'BURN FAT NATURALLY'],
    imageUrl: '/images/bottle-6.png',
  },
  {
    qty: 3,
    pricePerBottle: 59,
    badge: 'bundle',
    label: 'BUNDLE',
    bonus: 'Digital Weight Loss Content',
    features: ['7 FREE BONUSES\n($1549 VALUE)', 'FREE SHIPPING', 'BURN FAT NATURALLY'],
    imageUrl: '/images/bottle-3.png',
  },
]

function tiersFromOffer(offer: Offer<true> | { id: string; basePrice: string; shipPrice: string | null }): UIProduct[] {
  const apiPrice = Number(offer.basePrice ?? 0)
  const shippingCost = Number(offer.shipPrice ?? 0)
  return TIERS.map((t) => {
    const price = t.pricePerBottle || apiPrice
    return {
      id: `${offer.id}-${t.qty}`,
      offerId: offer.id,
      label: t.label,
      badge: t.badge,
      plan: `${t.qty} Bottle${t.qty > 1 ? 's' : ''}`,
      supply: `${t.qty * 30} Day Supply`,
      imageUrl: t.imageUrl,
      bonus: t.bonus,
      price: { dollars: `$${Math.floor(price)}`, unit: '/ bottle' },
      features: t.features,
      perServing: `$${(price / 30).toFixed(2)}`,
      isPopular: t.isPopular,
      basePrice: price,
      shippingCost,
      quantityToBuy: t.qty,
    }
  })
}

async function fetchOffers(): Promise<UIProduct[]> {
  try {
    const result = await searchResources(
      {
        organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID,
        resource: 'offers',
        limit: 10,
        filters: { campaignId: process.env.NEXT_PUBLIC_CAMPAIGN_ID },
      },
      process.env.API_KEY || '',
    )
    // Use the "Normal bottle" offer (or first non-clinical-upgrade) for the 3 home tiers
    const normal =
      result.data.find((o) => o.id === normalOfferId) ||
      result.data.find((o) => o.id !== clinicalUpgradeOfferId) ||
      result.data[0]
    if (!normal) return mockProducts
    return tiersFromOffer(normal as any)
  } catch (err) {
    console.error('[fetchOffers] failed, using mock data:', err)
    return mockProducts
  }
}

export async function getSubscriptionProducts(): Promise<UIProduct[]> {
  return fetchOffers()
}

export async function getOneTimeProducts(): Promise<UIProduct[]> {
  return fetchOffers()
}

const mockProducts: UIProduct[] = [
  {
    id: 'sub-1',
    label: 'BASIC',
    badge: 'basic',
    plan: '1 Bottle',
    supply: '30 Day Supply',
    imageUrl: '/images/bottle-1.png',
    price: { dollars: '$71', cents: '.10', unit: '/ bottle' },
    features: ['NATURAL FORMULA', 'FAST SHIPPING'],
    perServing: '$2.37',
  },
  {
    id: 'sub-6',
    label: 'MOST POPULAR',
    badge: 'popular',
    plan: '6 Bottles',
    supply: '180 Day Supply',
    imageUrl: '/images/bottle-6.png',
    bonus: 'Digital Weight Loss Content',
    price: { dollars: '$49', cents: '.50', unit: '/ bottle' },
    features: ['7 FREE BONUSES\n($1549 VALUE)', 'FREE SHIPPING', 'BURN FAT NATURALLY'],
    perServing: '$1.65',
    isPopular: true,
  },
  {
    id: 'sub-3',
    label: 'BUNDLE',
    badge: 'bundle',
    plan: '3 Bottles',
    supply: '90 Day Supply',
    imageUrl: '/images/bottle-3.png',
    bonus: 'Digital Weight Loss Content',
    price: { dollars: '$53', cents: '.10', unit: '/ bottle' },
    features: ['7 FREE BONUSES\n($1549 VALUE)', 'FREE SHIPPING', 'BURN FAT NATURALLY'],
    perServing: '$1.77',
  },
]

export async function getComments(): Promise<Comment[]> {
  return [
    { id: '1', isReply: false, name: 'Rachel Thompson', avatarId: 32, messages: ['I was honestly ready to close this tab after 30 seconds.', "But then she started explaining why every other weight loss supplement I'd tried had failed me. That's when I couldn't stop watching."], timeAgo: '2h', reactions: '42' },
    { id: '2', isReply: true, name: 'Jennifer Liu', avatarId: 44, messages: ['Same here Rachel. The part about how your metabolism slows down when you take the wrong supplements was eye-opening.'], timeAgo: '1h', reactions: '' },
    { id: '3', isReply: true, name: 'Megan Torres', avatarId: 28, messages: ["Exactly. I've spent hundreds on products that made big claims. This is the first time someone explained the science behind why they didn't work."], timeAgo: '1h', reactions: '28' },
    { id: '4', isReply: false, name: 'David Chen', avatarId: 55, messages: ['Honest question — has anyone actually tried this or is everyone just reacting to the video?'], timeAgo: '45m', reactions: '23' },
    { id: '5', isReply: true, name: 'Lauren Hayes', avatarId: 63, messages: ['David I ordered mine three weeks ago. Down 11 pounds and my afternoon cravings are completely gone.'], timeAgo: '3h', reactions: '27' },
    { id: '6', isReply: true, name: 'Marcus Rivera', avatarId: 38, messages: ["I'm on week two myself. The capsules are easy to take and I actually have more energy throughout the day. Lost 9 lbs so far."], timeAgo: '2h', reactions: '31' },
    { id: '7', isReply: false, name: 'Christine Moore', avatarId: 71, messages: ["It's not even about the number on the scale for me. After watching the full video about how your gut repairs itself when you support it properly, I finally got why nothing worked before."], timeAgo: '2h', reactions: '38' },
    { id: '8', isReply: true, name: 'Sarah Kim', avatarId: 19, messages: ["Yes! My appetite dropped within the first three days. Honestly startled me because I'm used to being hungry all the time."], timeAgo: '2h', reactions: '48' },
    { id: '9', isReply: false, name: 'Brian Mitchell', avatarId: 42, messages: ['Has anyone seen real weight loss results? Or is the comment section just hype?'], timeAgo: '2h', reactions: '33' },
    { id: '10', isReply: true, name: 'Nicole Adams', avatarId: 51, messages: ["Brian — 14 lbs in 10 days for me. My husband started too and he's down 8 lbs in a week."], timeAgo: '2h', reactions: '48' },
    { id: '11', isReply: true, name: 'Ashley Cooper', avatarId: 26, messages: ["I'm further along. Down 27 lbs in about two and a half weeks. What shocked me most was how full I feel all day."], timeAgo: '1d', reactions: '45' },
    { id: '12', isReply: false, name: 'Danielle Foster', avatarId: 84, messages: ["Almost skipped this video when I saw the length. So glad I didn't — it literally changed how I think about weight loss."], timeAgo: '1d', reactions: '50' },
    { id: '13', isReply: false, name: 'Stephanie Hughes', avatarId: 67, messages: ['The craziest part is realizing the formula itself was never the problem — it was the cheap knockoffs that gave supplements a bad name.'], timeAgo: '1d', reactions: '48' },
    { id: '14', isReply: false, name: 'Maria Gonzalez', avatarId: 35, messages: ["I stayed because she mentioned women over 40 losing 50+ lbs once their hormones activate naturally again. That's me. I'm all in."], timeAgo: '2d', reactions: '46' },
  ]
}
