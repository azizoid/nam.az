import Head from 'next/head';
import styles from './Loader.module.css';

export const Loader = () => (
  <div className="text-center">
    <Head>
      <title>Nam.az - Namazını qıl</title>
    </Head>
    <div className={styles.ldsFacebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
