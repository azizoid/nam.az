'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Loader } from '@/components/Loader/Loader'

const HomePage = () => {
  const router = useRouter()

  useEffect(() => {
    const city = localStorage.getItem('namaz:city')

    router.push(`/${city || 'baki'}`)
  }, [router])

  return <Loader />
}

export default HomePage