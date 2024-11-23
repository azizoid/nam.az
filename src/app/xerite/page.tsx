'use client'

import { Xerite } from "@/components/Xerite/Xerite"
import { useNamazStore } from "@/store/namazStore"

import { useRouter } from "next/navigation"

const XeritePage = () => {
  const { city } = useNamazStore()
  const router = useRouter()

  const handleCityChange = (newCityId: string) => {
    router.push(`/${newCityId}`)
  }

  return <div className="h-screen">
    <Xerite selectedCity={city || 'baki'} onClick={handleCityChange} />
  </div>
}

export default XeritePage