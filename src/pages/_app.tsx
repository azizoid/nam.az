import '@/styles/globals.css'

import { useEffect } from 'react'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { Provider } from 'react-redux'

import { Layout } from '@/components'
import { store } from '@/store'
import * as gtag from '@/utilities/gtag' // Import the gtag helper functions

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url) // Track pageview on route change
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Provider store={store}>
      <Head>
        <title>Nam.az - Namazını qıl</title><meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        id="ga-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-inline-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}');
              `,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App