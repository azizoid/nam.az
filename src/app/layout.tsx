import '@/styles/globals.css'

import { PropsWithChildren } from 'react'

import { Analytics } from '@/components/Analytics'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'

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
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
