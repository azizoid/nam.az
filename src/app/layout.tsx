import '@/styles/globals.css'

import { PropsWithChildren } from 'react'

import { GoogleAnalytics } from '@next/third-parties/google'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { GA_TRACKING_ID } from '@/utilities/gtag'

import { MainMetadata, MainViewport } from './metadata'

export const metadata = MainMetadata
export const viewport = MainViewport

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="az">
      <body>
        <div className="absolute inset-0 z-[-1] bg-[url('../assets/abstract-lines.svg')] bg-cover bg-center opacity-10" />

        <div className="flex min-h-screen flex-col justify-between">
          <Header />

          {children}

          <Footer />
        </div>
      </body>
      <GoogleAnalytics gaId={GA_TRACKING_ID} />
    </html>
  )
}

export default RootLayout