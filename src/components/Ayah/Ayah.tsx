import { useState, useEffect } from 'react';

import { MdFormatQuote } from 'react-icons/md';

import styles from './Ayah.module.scss';

const fetchAyah = async () => {
  const response = await fetch('https://quran.az/api/random/');
  return response.json();
};

export type AyahApiProps = {
  id: string;
  soorah: number;
  ayah: number;
  content: string;
  content_latinized: string;
  translator: number;
};

const Ayah = (): JSX.Element => {
  const [ayah, setAyah] = useState<AyahApiProps>({
    id: 'defaultID',
    soorah: 40,
    ayah: 60,
    content:
      "Rəbbiniz dedi: 'Mənə dua edin, Mən də sizə cavab verim. Həqiqətən, Mənə ibadət etməyə təkəbbür göstərənlər Cəhənnəmə zəlil olaraq girəcəklər'.",
    content_latinized: '',
    translator: 4,
  });

  useEffect(() => {
    fetchAyah().then(({ out }) => setAyah(out));
  }, []);

  return (
    <blockquote className={styles.ayah}>
      <MdFormatQuote style={{ color: '#66cc66' }} />
      <cite>
        {ayah.soorah} : {ayah.ayah}
      </cite>
      {ayah.content}
      <a
        href={`https://quran.az/${ayah.soorah}#${ayah.ayah}?rel=namaz`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <br />
        <small>Surəni Tam Oxu</small>
      </a>
    </blockquote>
  );
};

export default Ayah;
