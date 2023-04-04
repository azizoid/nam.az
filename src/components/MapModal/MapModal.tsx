import { useSelector } from "react-redux";
import { Modal, ModalProps } from "./Modal/Modal";
import { Xerite } from "./Xerite/Xerite";
import { selectNamazData } from "@/store/namazSlice";
import { useRouter } from "next/router";


export const MapModal = ({
  open,
  onClose,
}: ModalProps) => {
  const router = useRouter()
  const { city } = useSelector(selectNamazData)

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Xerite
        onClick={(city) => router.push(`/${city}`).finally(() => onClose())}
        selectedCity={city ?? 1}
      />
    </Modal>
  )
};

export default MapModal;
