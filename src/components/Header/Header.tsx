'use client'

import { useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FaSearchLocation } from 'react-icons/fa'

import { Link } from '@/components/Link'

const XeritePage = dynamic(() => import('@/components/Xerite/XeritePage').then((mod) => mod.XeritePage), {

})

export const Header = () => {

  const [isMapOpen, setIsMapOpen] = useState<boolean>(false)

  return (
    <div className="bg-gray-100 p-2">
      <nav className="container mx-auto flex items-center justify-between">
        <Link
          className="flex flex-col content-start items-center py-2 text-gray-500 hover:opacity-75"
          href="/"
        >
          <Image
            src="/favicon.png"
            width="30"
            height="30"
            alt="nam.az"
            className="mr-2"
          />
          Nam.az
        </Link>

        <div className="flex flex-col">
          <button onClick={() => setIsMapOpen(prev => !prev)}
            className="mr-1 rounded-md bg-green-500 py-2 text-sm text-white shadow-sm outline-hidden transition-all duration-150 ease-linear hover:shadow-lg focus:outline-hidden active:bg-green-600">
            <div className="flex items-center justify-center">
              Şəhərini seç&nbsp;
              <FaSearchLocation size="1em" />
            </div>
          </button>

          <small>
            Bakı, Gəncə, <u>Şuşa</u> və digər
          </small>

        </div>
      </nav>

      {isMapOpen && <XeritePage onCloseAction={() => setIsMapOpen(false)} />}

    </div >
  )
}