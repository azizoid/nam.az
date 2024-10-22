'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router = useRouter()

  useEffect(() => {
    const city = localStorage.getItem('namaz:city')

    router.push(`/${city || 'baki'}`)
  }, [router])
}

export default HomePage