import '@/styles/globals.css'

import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import TagManager from 'react-gtm-module'
import { Provider } from 'react-redux'

import { Layout } from '@/components'
import { store } from '@/store'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GTM_ID as string
    })
  }, [])

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
