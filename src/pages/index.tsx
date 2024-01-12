import Image from 'next/image';
import { Inter } from 'next/font/google';
import Seo from '@/components/layout/Seo';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  const { nickname, userId } = useSelector((state: RootState) => state.auth);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <>
      {isLoaded && (
        <div className='container'>
          <Seo title='Home' />
          <span>{nickname}</span>
        </div>
      )}
    </>
  );
};

export default Home;
