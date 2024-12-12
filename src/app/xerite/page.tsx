'use client'

import { useRouter } from 'next/navigation'

import { Xerite } from '@/components/Xerite/Xerite'
import { useNamazStore } from '@/store/namazStore'

type XeritePageProps = {
  onCloseCallback: () => void
}

const XeritePage = ({ onCloseCallback }: XeritePageProps) => {
  const { city } = useNamazStore()
  const router = useRouter()

  const handleCityChange = (newCityId: string) => {
    router.push(`/${newCityId}`)
    onCloseCallback()
  }

  return <div className="h-screen">
    <Xerite selectedCity={city || 'baki'} onClick={handleCityChange} />
  </div>
}

export default XeritePage