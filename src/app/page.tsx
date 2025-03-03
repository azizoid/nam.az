'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { selectCity } from '@/utilities/selectCity/selectCity'

const HomePage = () => {
  const router = useRouter()

  useEffect(() => {
    const city = localStorage.getItem('namaz:city')
    const cityData = selectCity(city).slug

    router.push(`/${cityData}`)
  }, [router])
}

export default HomePage