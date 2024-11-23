'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaSearchLocation } from 'react-icons/fa'

export const Header = () => (
  <div className="bg-gray-100 p-2">
    <nav className="container mx-auto flex justify-between">
      <Link
        className="flex content-start items-center py-2 text-gray-500 hover:opacity-75"
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
        <Link
          className="mr-1 rounded-md bg-green-500 py-2 text-sm text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-green-600"
          style={{ height: 36 }} href='/xerite'
        >
          <div className="flex items-center justify-center">
            Xəritə &nbsp;
            <FaSearchLocation size="1em" />
          </div>
        </Link>

        <small>
          Bakı, Gəncə, <u>Şuşa</u> və digər
        </small>
      </div>
    </nav >
  </div >
)
