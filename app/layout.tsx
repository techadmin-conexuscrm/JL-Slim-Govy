import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import 'react-phone-number-input/style.css'
import { RootProvider } from './context/rootProvider'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SlimGovy',
  description: 'SlimGovy — Weight Loss & Calorie Burner.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-montserrat text-navy bg-white leading-relaxed`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
