import '@/styles/globals.css'

import { ReactNode } from 'react'

import { MainMetadata } from './metadata'

export const metadata = MainMetadata

export type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="az">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout