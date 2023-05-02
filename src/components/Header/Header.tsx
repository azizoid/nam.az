import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { FaSearchLocation } from 'react-icons/fa'

import { MapModal } from '@/components'

export const Header = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="bg-gray-100 py-2 px-2">
      <nav className="flex justify-between container mx-auto">
        <Link
          className="py-2 flex items-center content-start text-gray-500 hover:opacity-75"
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
          <button
            className="bg-green-500 text-white active:bg-green-600 text-sm py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
            style={{ height: 36 }}
          >
            <div className="flex justify-center items-center">
              Xəritə &nbsp;
              <FaSearchLocation size="1em" />
            </div>
          </button>

          <MapModal
            open={showModal}
            onClose={() => setShowModal(false)}
          />

          <small>
            Bakı, Gəncə, <u>Şuşa</u> və digər
          </small>
        </div>
      </nav >
    </div >
  )
}
