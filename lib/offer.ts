// Slim-govy uses two offers (regular + clinical-strength upgrade).
// JLSlimGovy single-product flow keeps both so the upsell on /upgradebottle136 works.
export const normalOfferId = '3d583e2a-9f71-4984-9fbd-de9e3cc6b569'
export const clinicalUpgradeOfferId = '4b130529-9b79-478b-9ce1-f0b28c213092'

export const getImageUrlByQuantity = (quantityToBuy: number) =>
  quantityToBuy === 1 ? '/images/bottle-1.png' : quantityToBuy === 3 ? '/images/bottle-3.png' : '/images/bottle-6.png'

export const getClinicalUpgradeImageUrlByQuantity = (quantityToBuy: number) =>
  quantityToBuy === 1 ? '/images/bottle-1.png' : quantityToBuy === 3 ? '/images/bottle-3.png' : '/images/bottle-6.png'

export const countries = [
  'United States of America',
  'Canada',
  'United Kingdom',
  'Australia',
  'Mexico',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Brazil',
  'Argentina',
  'Chile',
  'Colombia',
  'Japan',
  'South Korea',
  'India',
]
