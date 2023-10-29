import '@/styles/globals.css'

import { PropsWithChildren } from 'react'

import { MainMetadata, MainViewport } from './metadata'

export const metadata = MainMetadata
export const viewport = MainViewport

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="az">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout