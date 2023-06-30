import { MdFormatQuote } from 'react-icons/md'

import { AyahApiProps } from './Ayah'

type AyahViewProps = { randomAyah: AyahApiProps }

export const AyahView = ({ randomAyah }: AyahViewProps) => (
  <blockquote className="mx-auto my-4 flex w-4/5 flex-col space-y-2 border-l-2 border-green-400 p-4 italic text-neutral-600 md:block md:w-2/3" id="quote">
    <h4 className="flex justify-start">
      <MdFormatQuote className="mr-4 text-green-400" aria-hidden="true" />
      {randomAyah.soorah} : {randomAyah.ayah}
    </h4>
    <p className="mb-2">{randomAyah.content}</p>
    <cite>
      <a
        href={`https://quran.az/${randomAyah.soorah}?t=${randomAyah.translator}&rel=nam.az`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <small>Surəni Tam Oxu</small>
      </a>
    </cite>
  </blockquote>
)
