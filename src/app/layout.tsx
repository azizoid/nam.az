import '@/styles/globals.css'

import { PropsWithChildren } from 'react'

import { MainMetadata, MainViewport } from './metadata'

export const metadata = MainMetadata
export const viewport = MainViewport

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="az">
      <body>
        <div className="absolute inset-0 bg-[url('../assets/abstract-lines.svg')] bg-cover bg-center opacity-10 z-[-1]" />
        {children}
      </body>
    </html>
  )
}

export default RootLayout