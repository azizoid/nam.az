import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot as asd } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { MapModal } from '@/components';

export const Header = () => {
  const [showModal, setShowModal] = useState(false);

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
          >
            Xəritə <FontAwesomeIcon icon={asd} beat transform="shrink-2" />
          </button>

          <MapModal
            open={showModal}
            onClose={() => setShowModal(false)}
          />


          <small>
            Bakı, Gəncə, <u>Şuşa</u> və digər
          </small>
        </div>
      </nav>
    </div>
  );
};
