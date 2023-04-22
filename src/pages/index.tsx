
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const city = localStorage.getItem('city');

    router.push(`/${city || '1'}`);
  }, [router]);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Loading...</p>
    </div>
  );
};

export default Home;