import { PropsWithChildren, useCallback, useEffect } from 'react';

import { createPortal } from 'react-dom';

export type ModalProps = PropsWithChildren<{
  open?: boolean;
  onClose: () => void;
}>

export const Modal = ({
  open,
  onClose,
  children,
}: ModalProps) => {
  const keyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    },
    [onClose, open]
  )

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return createPortal(
    <>
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          />

          <div
            className="fixed inset-0 top-5 mx-auto flex h-full w-full max-w-screen-sm flex-col content-center bg-white p-3 pt-0 opacity-100 shadow-lg"
          >
            <button
              type="button"
              onClick={onClose}
              className="btn text-right text-lg"
              title="Şəhəri seç və bağla"
            >
              Bağla [ x ]
            </button>

            {children}

            <small className="mt-2">
              * Namaz vaxtlarını görmək üçün yaşadığınız şəhər və ya ən yaxın
              şəhəri seçin
            </small>
          </div>
        </>
      )}
    </>,
    document.body
  )
}
