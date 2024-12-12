'use client'

import { useRouter } from 'next/navigation'

import { Xerite } from '@/components/Xerite/Xerite'
import { useNamazStore } from '@/store/namazStore'

type XeritePageProps = {
  onCloseAction: () => void
}

export const XeritePage = ({ onCloseAction }: XeritePageProps) => {
  const { city } = useNamazStore()
  const router = useRouter()

  const handleCityChange = (newCityId: string) => {
    router.push(`/${newCityId}`)
    onCloseAction()
  }

  return <div className="h-screen">
    <Xerite selectedCity={city || 'baki'} onClick={handleCityChange} />
  </div>
}