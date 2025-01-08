import useSWR from 'swr'

import { fetcher } from '@/utilities/fetcher'

import { AyahView } from './AyahView'

export type AyahApiProps = {
  id: string;
  soorah: number;
  ayah: number;
  content: string;
  content_latinized: string;
  translator: number;
};

export const Ayah = () => {
  const apiUrl = 'https://quran.az/api/random'
  const { data } = useSWR(apiUrl, fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  const displayAyahByDefault = {
    id: 'defaultID',
    soorah: 40,
    ayah: 60,
    content:
      'Rəbbiniz dedi: \'Mənə dua edin, Mən də sizə cavab verim. Həqiqətən, Mənə ibadət etməyə təkəbbür göstərənlər Cəhənnəmə zəlil olaraq girəcəklər\'.',
    content_latinized: '',
    translator: 4,
  }

  return <AyahView randomAyah={data ? data.out : displayAyahByDefault} />
}
