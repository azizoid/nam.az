import dynamic from 'next/dynamic';

export { Footer } from './Footer/Footer';

export { Header } from './Header/Header';

export { Loader } from './Loader/Loader';

export { Layout } from './Layout/Layout'

export const MapModal = dynamic(() => import('./MapModal/MapModal'), {
  ssr: false
})

