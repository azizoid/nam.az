import { Modal } from 'components/Modal/Modal';
import { Map } from 'components/Map/Map';
import { useState } from 'react';

export type HeaderProps = {
  changeCity: (city: number) => void;
  city: number;
};

export const Header = ({ changeCity, city }: HeaderProps): JSX.Element => {
  const [showModal, setShowModal] = useState(true);
  return (
    <nav className="flex justify-between container mx-auto">
      <a
        className="py-2 flex items-center content-start text-gray-500 hover:opacity-75"
        href="/"
      >
        <img
          src="/favicon.png"
          width="30"
          height="30"
          alt="nam.az"
          className="mr-2"
        />
        Nam.az
      </a>

      <div className="flex flex-col">
        <button
          className="bg-green-500 text-white active:bg-green-600 text-sm py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Xəritə
        </button>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Map
            onClick={changeCity}
            setShowModal={setShowModal}
            selectedCity={city}
          />
        </Modal>

        <small>
          Bakı, Gəncə, <u>Şuşa</u> və digər
        </small>
      </div>
    </nav>
  );
};
