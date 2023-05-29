'use client'
import { ReactNode } from 'react'

import { Provider } from 'react-redux'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { store } from '@/store'

export type RootLayoutProps = {
  children: ReactNode
}

const RootTemplate = ({ children }: RootLayoutProps) => {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col justify-between">

        <Header />

        {children}

        <Footer />

      </div>
    </Provider>
  )
}

export default RootTemplate