import useSWR from 'swr'

import { fetcher } from '@/utilities'

import { AyahView } from './AyahView'

export type AyahApiProps = {
  id: string;
  soorah: number;
  ayah: number;
  content: string;
  content_latinized: string;
  translator: number;
};

const displayAyahByDefault = {
  id: 'defaultID',
  soorah: 40,
  ayah: 60,
  content:
    'Rəbbiniz dedi: \'Mənə dua edin, Mən də sizə cavab verim. Həqiqətən, Mənə ibadət etməyə təkəbbür göstərənlər Cəhənnəmə zəlil olaraq girəcəklər\'.',
  content_latinized: '',
  translator: 4,
}

export const Ayah = () => {
  const { data } = useSWR('https://quran.az/api/random', fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  return <AyahView randomAyah={data ? data.out : displayAyahByDefault} />
}