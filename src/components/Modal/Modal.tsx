import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ModalProps = {
  open?: boolean;
  onClose: () => void;
} & PropsWithChildren;

export const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
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
          className={`relative top-5 mx-auto flex flex-col content-center p-3 h-full bg-white shadow-lg w-full max-w-screen-sm ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <button type="button" onClick={onClose} className="btn text-lg">
            Bağla
          </button>
          {children}
          <small className={'mt-2'}>
            * Namaz vaxtlarını görmək üçün yaşadığınız şəhər və ya ən yaxın
            şəhəri seçin
          </small>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
};