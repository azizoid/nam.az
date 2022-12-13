import { ReactElement, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ModalProps = {
  open?: boolean;
  onClose: () => void;
  showQibla: boolean;
  toggleQibla: () => void;
  children?: ReactElement;
};

export const Modal = ({
  open,
  onClose,
  showQibla,
  toggleQibla,

  children,
}: ModalProps) => {
  const keyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    },
    [onClose, open]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  if (typeof document !== 'undefined') {
    return createPortal(
      <div className={`fixed inset-0 ${open ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-black ${
            open ? 'opacity-50' : 'pointer-events-none opacity-0'
          }`}
          onClick={onClose}
        />

        <div
          className={`relative top-5 mx-auto flex flex-col content-center p-3 pt-0 h-full bg-white shadow-lg w-full max-w-screen-sm ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="btn text-lg text-right"
            title="Şəhəri seç və bağla"
          >
            Bağla [ x ]
          </button>

          {children}

          <small className={'mt-2'}>
            * Namaz vaxtlarını görmək üçün yaşadığınız şəhər və ya ən yaxın
            şəhəri seçin
          </small>
          <div className="mt-2 flex items-center">
            <input
              id="showQiblah"
              type="checkbox"
              value={showQibla ? 1 : 0}
              onChange={toggleQibla}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="showQiblah" className="ml-2 text-sm">
              Qibləni göstər
            </label>
          </div>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
};
