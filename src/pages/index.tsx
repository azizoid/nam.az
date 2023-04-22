
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader } from '@/components';
import Head from 'next/head';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const city = localStorage.getItem('city');

    router.push(`/${city || '1'}`);
  }, [router]);

  return <>
    <Head>
      <title>Nam.az - Namazını qıl</title>
    </Head>
    <Loader />
  </>
};

export default Home;