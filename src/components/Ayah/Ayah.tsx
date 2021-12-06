import { useState, useEffect } from 'react';

import { MdFormatQuote } from 'react-icons/md';

import styles from './Ayah.module.scss';

const fetchAyah = async () => {
  const response = await fetch('https://quran.az/api/random/');
  return response.json();
};

const Ayah = (): JSX.Element => {
  const [ayah, setAyah] = useState({
    content: {
      s: 40,
      a: 60,
      c: "Rəbbiniz dedi: 'Mənə dua edin, Mən də sizə cavab verim. Həqiqətən, Mənə ibadət etməyə təkəbbür göstərənlər Cəhənnəmə zəlil olaraq girəcəklər'.",
    },
  });

  useEffect(() => {
    fetchAyah().then(data => setAyah({ content: data.out }));
  }, []);

  return (
    <blockquote className={styles.ayah}>
      <MdFormatQuote style={{ color: '#66cc66' }} />
      <cite>
        {ayah.content.s} : {ayah.content.a}
      </cite>
      {ayah.content.c}
      <a
        href={`https://quran.az/${ayah.content.s}#${ayah.content.a}?rel=namaz`}
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
