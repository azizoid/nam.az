'use client'

import { useRouter } from 'next/navigation'

import { useAtom } from 'jotai'

import { Xerite } from '@/components/Xerite/Xerite'
import { cityAtom } from '@/store/jotaiStore'

type XeritePageProps = {
  onCloseAction: () => void
}

export const XeritePage = ({ onCloseAction }: XeritePageProps) => {
  const [city] = useAtom(cityAtom)
  const router = useRouter()

  const handleCityChange = (newCityId: string) => {
    router.push(`/${newCityId}`)
    onCloseAction()
  }

  return <div className="h-screen">
    <Xerite selectedCity={city || 'baki'} onClick={handleCityChange} />
  </div>
}