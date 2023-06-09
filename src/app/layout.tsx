import '@/styles/globals.css'

import { ReactNode } from 'react'

import { Metadata } from 'next'

const metadataTitle = {
  title: {
    template: '%s | Nam.az - Namazını qıl',
    default: 'Nam.az - Namazını qıl',
  },
}

export const metadata: Metadata = {
  icons: './favicon.ico',
  ...metadataTitle,
  themeColor: '#155724',
  description: 'Azərbaycanın müxtəlif şəhərləri üçün namaz vaxtlarını təqdim etdik. Bakı, Sumqayıt, Gəncə, Lənkaran, Mingəçevir, Naxçıvan, Ağdam, Astara, Beyləqan, Cəlilabad, Göyçay, Qəbələ, Qazax, Quba, Qusar, Saatlı, Sabirabad, Şamaxı, Şəki, Şirvan, Xaçmaz, Yevlax, Zaqatala, Şuşa, Füzuli, Cəbrayıl, Zəngilan, Qubadlı, Kəlbəcər, Laçın, Zəngəzur və digər şəhərlərdəki Sübh, Zöhr, Əsr, Məğrib (Şam), İşa vaxtlarını öyrənin.',
  keywords: ['Azərbaycan namaz vaxtları', 'İslam namaz vaxtları', 'Azərbaycan Salah vaxtları', 'Azərbaycanın müsəlman namaz cədvəli', 'Namaz vaxtları Azərbaycan', 'Bakı namaz vaxtları', 'Sumqayıt namaz vaxtları', 'Gəncə namaz vaxtları', 'Lənkaran namaz vaxtları', 'Mingəçevir namaz vaxtları', 'Naxçıvan namaz vaxtları', 'Ağdam namaz vaxtları', 'Astara namaz vaxtları', 'Beyləqan namaz vaxtları', 'Cəlilabad namaz vaxtları', 'Göyçay namaz vaxtları', 'Qəbələ namaz vaxtları', 'Qazax namaz vaxtları', 'Quba namaz vaxtları', 'Qusar namaz vaxtları', 'Saatlı namaz vaxtları', 'Sabirabad namaz vaxtları', 'Şamaxı namaz vaxtları', 'Şəki namaz vaxtları', 'Şirvan namaz vaxtları', 'Xaçmaz namaz vaxtları', 'Yevlax namaz vaxtları', 'Zaqatala namaz vaxtları', 'Şuşa namaz vaxtları', 'Marneuli namaz vaxtları', 'Ərdəbil namaz vaxtları', 'Füzuli namaz vaxtları', 'Cəbrayıl namaz vaxtları', 'Zəngilan namaz vaxtları', 'Qubadlı namaz vaxtları', 'Kəlbəcər namaz vaxtları', 'Laçın namaz vaxtları', 'Zəngəzur namaz vaxtları', 'Müsəlman namaz tətbiqi', 'Azərbaycan Adhan vaxtları', 'Fəcr, Döhr, Əsr, Məğrib, İşa vaxtları Azərbaycan', 'Namaz vaxtları veb tətbiqi', 'Azərbaycan namaz vaxtları tətbiqi', 'İslam Salah cədvəli', 'Namaz cədvəli Azərbaycan', 'Azərbaycan məscid namaz vaxtları', 'Qibla istiqaməti Azərbaycan', 'Namaz xəbərdarlıqları Azərbaycan', 'İslam namaz tətbiqi Azərbaycan', 'Gündəlik namaz vaxtları Azərbaycan'],
  metadataBase: new URL('https://nam.az'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    ...metadataTitle,
    description: 'Azərbaycan və azərbaycanlıların yaşadığı şəhərləri üzrə namaz vaxtları',
    images: 'https://nam.az/img/ogimage.png',
    type: 'website',
    url: new URL('https://nam.az'),
  },
  twitter: {
    ...metadataTitle,
    description: 'Azərbaycan və azərbaycanlıların yaşadığı şəhərləri üzrə namaz vaxtları',
    creator: '@azizoid',
    images: 'https://nam.az/img/ogimage.png',
    card: 'summary_large_image'
  },
}

export type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="az">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout