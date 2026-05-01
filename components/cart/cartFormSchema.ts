import { z } from 'zod'

export const cartFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .refine((v) => v.trim().split(' ').filter(Boolean).length >= 2, { message: 'Enter first and last name' }),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  addressLine1: z.string().min(1, 'Address is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .transform((v) => v.replace(/\s/g, ''))
    .refine((v) => /^\d{13,19}$/.test(v), { message: 'Invalid card number' }),
  cardHolderName: z.string().min(1, 'Cardholder name is required'),
  cardExpMonth: z
    .string()
    .min(1, 'Required')
    .refine((v) => { const m = parseInt(v, 10); return !isNaN(m) && m >= 1 && m <= 12 }, { message: 'Invalid month (01-12)' }),
  cardExpYear: z.string().min(1, 'Required').refine((v) => /^\d{2}$/.test(v), { message: 'Invalid year (YY)' }),
  ccv: z.string().min(1, 'CVV is required').refine((v) => /^\d{3,4}$/.test(v), { message: 'Invalid CVV (3-4 digits)' }),
})

export function validateCartForm(paymentForm: any): Record<string, string> {
  const result = cartFormSchema.safeParse(paymentForm)
  if (result.success) return {}
  return Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message]))
}
