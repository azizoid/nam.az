
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader } from '@/components';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const city = localStorage.getItem('city');

    router.push(`/${city || '1'}`);
  }, [router]);

  return <Loader />
};

export default Home;