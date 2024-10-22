import '@/styles/globals.css'

import { PropsWithChildren } from 'react'

import Script from 'next/script'

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
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}');
        `}
          </Script>

          <Header />

          {children}

          <Footer />
        </div>
      </body>
    </html>
  )
}

export default RootLayout