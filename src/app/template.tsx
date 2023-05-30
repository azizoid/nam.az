'use client'
import { Provider } from 'react-redux'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { store } from '@/store'

import { RootLayoutProps } from './layout'

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