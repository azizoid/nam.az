import { Map, MapProps, Modal, ModalProps } from 'components';

export const MapModal = ({
  open,
  onClose,
  showQibla,
  toggleQibla,
  onClick,
  setShowModal,
  selectedCity,
}: MapProps & ModalProps) => (
  <Modal
    open={open}
    onClose={onClose}
    showQibla={showQibla}
    toggleQibla={toggleQibla}
  >
    <Map
      onClick={onClick}
      setShowModal={setShowModal}
      selectedCity={selectedCity}
      showQibla={showQibla}
    />
  </Modal>
);

export default MapModal;
