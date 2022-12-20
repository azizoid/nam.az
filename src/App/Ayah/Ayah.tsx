import { useEffect, useState } from 'react';
import { MdFormatQuote } from 'react-icons/md';

const fetchAyah = async () => {
  const response = await fetch('https://quran.az/api/random');
  const json = await response.json();
  return json;
};

export type AyahApiProps = {
  id: string;
  soorah: number;
  ayah: number;
  content: string;
  content_latinized: string;
  translator: number;
};

const Ayah = () => {
  const [randomAyah, setRandomAyah] = useState<AyahApiProps>({
    id: 'defaultID',
    soorah: 40,
    ayah: 60,
    content:
      "Rəbbiniz dedi: 'Mənə dua edin, Mən də sizə cavab verim. Həqiqətən, Mənə ibadət etməyə təkəbbür göstərənlər Cəhənnəmə zəlil olaraq girəcəklər'.",
    content_latinized: '',
    translator: 4,
  });

  useEffect(() => {
    fetchAyah()
      .then(({ out }) => setRandomAyah(out))
      .catch(error => {
        // console.error(error);
      });
  }, []);

  return (
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
};

export default Ayah;
