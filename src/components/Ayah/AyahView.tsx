import { MdFormatQuote } from 'react-icons/md';
import { AyahApiProps } from './Ayah';

type AyahProps = { randomAyah: AyahApiProps }

export const AyahView = ({ randomAyah }: AyahProps) => (
  <blockquote className="md:block flex flex-col space-y-2 w-4/5 md:w-2/3 mx-auto p-4 my-4 italic border-l-2 text-neutral-600 border-green-400 quote">
    <h4 className="flex justify-start">
      <MdFormatQuote className="text-green-400 mr-4" aria-hidden="true" />
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
);
