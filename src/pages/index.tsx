import Image from 'next/image';
import { Inter } from 'next/font/google';
import Seo from '@/components/Seo';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <div className='container'>
      <Seo title='Home' />
      HomePage
    </div>
  );
};

export default Home;
