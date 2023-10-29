'use client'
import { PropsWithChildren } from 'react'

import Script from 'next/script'

import { Provider } from 'react-redux'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { store } from '@/store'
import { GA_TRACKING_ID } from '@/utilities/gtag'

const RootTemplate = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
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
      <div className="flex min-h-screen flex-col justify-between">

        <Header />

        {children}

        <Footer />

      </div>
    </Provider>
  )

export default RootTemplate