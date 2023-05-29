'use client'
import '@/styles/globals.css'

import { ReactNode } from 'react'

const GTM_ID = process.env.GTM_ID

import { Provider } from 'react-redux'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { store } from '@/store'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (<html><head>
  </head>
    <body>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <Provider store={store}>
        <div className="min-h-screen flex flex-col justify-between">

          <Header />

          {children}

          <Footer />

        </div>
      </Provider>
    </body>
  </html>

  )
}

export default RootLayout