import type { Comment, Product } from './types'

// Replace these base URLs with your real API endpoints in production.
// const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.slimgovy.com'

export async function getSubscriptionProducts(): Promise<Product[]> {
  // Real call would be:
  // const res = await fetch(`${API_BASE}/products?type=subscription`, { next: { revalidate: 3600 } })
  // return res.json()
  return [
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
}

export async function getOneTimeProducts(): Promise<Product[]> {
  // Real call would be:
  // const res = await fetch(`${API_BASE}/products?type=onetime`, { next: { revalidate: 3600 } })
  // return res.json()
  return [
    {
      id: 'ot-1',
      label: 'BASIC',
      badge: 'basic',
      plan: '1 Bottle',
      supply: '30 Day Supply',
      imageUrl: '/images/bottle-1.png',
      price: { dollars: '$79', unit: '/ bottle' },
      features: ['NATURAL FORMULA', 'FAST SHIPPING'],
      perServing: '$2.63',
    },
    {
      id: 'ot-6',
      label: 'MOST POPULAR',
      badge: 'popular',
      plan: '6 Bottles',
      supply: '180 Day Supply',
      imageUrl: '/images/bottle-6.png',
      bonus: 'Digital Weight Loss Content',
      price: { dollars: '$55', unit: '/ bottle' },
      features: ['7 FREE BONUSES\n($1549 VALUE)', 'FREE SHIPPING', 'BURN FAT NATURALLY'],
      perServing: '$1.83',
      isPopular: true,
    },
    {
      id: 'ot-3',
      label: 'BUNDLE',
      badge: 'bundle',
      plan: '3 Bottles',
      supply: '90 Day Supply',
      imageUrl: '/images/bottle-3.png',
      bonus: 'Digital Weight Loss Content',
      price: { dollars: '$59', unit: '/ bottle' },
      features: ['7 FREE BONUSES\n($1549 VALUE)', 'FREE SHIPPING', 'BURN FAT NATURALLY'],
      perServing: '$1.97',
    },
  ]
}

export async function getComments(): Promise<Comment[]> {
  // Real call would be:
  // const res = await fetch(`${API_BASE}/comments`, { next: { revalidate: 60 } })
  // return res.json()
  return [
    {
      id: '1',
      isReply: false,
      name: 'Rachel Thompson',
      avatarId: 32,
      messages: [
        'I was honestly ready to close this tab after 30 seconds.',
        "But then she started explaining why every other weight loss supplement I'd tried had failed me. That's when I couldn't stop watching.",
      ],
      timeAgo: '2h',
      reactions: '42',
    },
    {
      id: '2',
      isReply: true,
      name: 'Jennifer Liu',
      avatarId: 44,
      messages: [
        "Same here Rachel. The part about how your metabolism slows down when you take the wrong supplements was eye-opening.",
      ],
      timeAgo: '1h',
      reactions: '',
    },
    {
      id: '3',
      isReply: true,
      name: 'Megan Torres',
      avatarId: 28,
      messages: [
        "Exactly. I've spent hundreds on products that made big claims. This is the first time someone explained the science behind why they didn't work.",
      ],
      timeAgo: '1h',
      reactions: '28',
    },
    {
      id: '4',
      isReply: false,
      name: 'David Chen',
      avatarId: 55,
      messages: ['Honest question — has anyone actually tried this or is everyone just reacting to the video?'],
      timeAgo: '45m',
      reactions: '23',
    },
    {
      id: '5',
      isReply: true,
      name: 'Lauren Hayes',
      avatarId: 63,
      messages: ["David I ordered mine three weeks ago. Down 11 pounds and my afternoon cravings are completely gone."],
      timeAgo: '3h',
      reactions: '27',
    },
    {
      id: '6',
      isReply: true,
      name: 'Marcus Rivera',
      avatarId: 38,
      messages: [
        "I'm on week two myself. The capsules are easy to take and I actually have more energy throughout the day. Lost 9 lbs so far.",
      ],
      timeAgo: '2h',
      reactions: '31',
    },
    {
      id: '7',
      isReply: false,
      name: 'Christine Moore',
      avatarId: 71,
      messages: [
        "It's not even about the number on the scale for me. After watching the full video about how your gut repairs itself when you support it properly, I finally got why nothing worked before.",
      ],
      timeAgo: '2h',
      reactions: '38',
    },
    {
      id: '8',
      isReply: true,
      name: 'Sarah Kim',
      avatarId: 19,
      messages: [
        "Yes! My appetite dropped within the first three days. Honestly startled me because I'm used to being hungry all the time.",
      ],
      timeAgo: '2h',
      reactions: '48',
    },
    {
      id: '9',
      isReply: false,
      name: 'Brian Mitchell',
      avatarId: 42,
      messages: ['Has anyone seen real weight loss results? Or is the comment section just hype?'],
      timeAgo: '2h',
      reactions: '33',
    },
    {
      id: '10',
      isReply: true,
      name: 'Nicole Adams',
      avatarId: 51,
      messages: ["Brian — 14 lbs in 10 days for me. My husband started too and he's down 8 lbs in a week."],
      timeAgo: '2h',
      reactions: '48',
    },
    {
      id: '11',
      isReply: true,
      name: 'Ashley Cooper',
      avatarId: 26,
      messages: [
        "I'm further along. Down 27 lbs in about two and a half weeks. What shocked me most was how full I feel all day.",
      ],
      timeAgo: '1d',
      reactions: '45',
    },
    {
      id: '12',
      isReply: false,
      name: 'Danielle Foster',
      avatarId: 84,
      messages: [
        "Almost skipped this video when I saw the length. So glad I didn't — it literally changed how I think about weight loss.",
      ],
      timeAgo: '1d',
      reactions: '50',
    },
    {
      id: '13',
      isReply: false,
      name: 'Stephanie Hughes',
      avatarId: 67,
      messages: [
        "The craziest part is realizing the formula itself was never the problem — it was the cheap knockoffs that gave supplements a bad name.",
      ],
      timeAgo: '1d',
      reactions: '48',
    },
    {
      id: '14',
      isReply: false,
      name: 'Maria Gonzalez',
      avatarId: 35,
      messages: [
        "I stayed because she mentioned women over 40 losing 50+ lbs once their hormones activate naturally again. That's me. I'm all in.",
      ],
      timeAgo: '2d',
      reactions: '46',
    },
  ]
}
