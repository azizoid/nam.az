import '@/styles/globals.css'

import { useEffect } from 'react'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import router from 'next/router'
import Script from 'next/script'

import { Provider } from 'react-redux'

import { Layout } from '@/components'
import { store } from '@/store'
import { GTM_ID, pageview } from '@/utilities'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events])

  return (
    <Provider store={store}>
      <Head>
        <title>Nam.az - Namazını qıl</title><meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
