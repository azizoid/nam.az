import { useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'

import { selectNamazData } from '@/store/namazSlice'

import { Modal, ModalProps } from './Modal/Modal'
import { Xerite } from './Xerite/Xerite'

export const MapModal = ({ open, onClose }: ModalProps) => {
  const router = useRouter()
  const { city } = useSelector(selectNamazData)

  const handleCityChange = (newCityId: string) => {
    router.push(`/${newCityId}`)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Xerite onClick={handleCityChange} selectedCity={city ?? 'baki'} />
    </Modal>
  )
}

export default MapModal
