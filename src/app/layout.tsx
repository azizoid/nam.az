import '@/styles/globals.css'

import { ReactNode } from 'react'

const GTM_ID = process.env.GTM_ID

import { Metadata } from 'next'

export const metadata: Metadata = {

  icons: './favicon.ico',
  themeColor: '#155724',
  description: 'Azərbaycan şəhərləri üzrə namaz vaxtları',
  keywords: ['Azərbaycan', 'şəhərləri', 'vaxtları', 'namaz', 'namaz vaxt', 'namaz vaxtları', 'namaz vaxtları namaz', 'namaz vaxtları namazları', 'namaz vaxtları namazları', 'namaz vaxtları namazları', 'təqvim'],
  metadataBase: new URL('https://nam.az'),
  openGraph: {
    title: 'Nam.az - Namazını qıl',
    description: 'Azərbaycan və azərbaycanlıların yaşadığı şəhərləri üzrə namaz vaxtları',
    images: 'https://nam.az/img/ogimage.png'
  },
  twitter: {
    title: 'Nam.az - Namazını qıl',
    description: 'Azərbaycan və azərbaycanlıların yaşadığı şəhərləri üzrə namaz vaxtları',
    creator: '@azizoid',
    images: 'https://nam.az/img/ogimage.png'
  },
}
type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (<html>
    <head>

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

      {children}
    </body>
  </html>

  )
}

export default RootLayout