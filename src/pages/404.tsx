// Custom404.jsx

import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Custom404() {
  const router = useRouter();

  const goToMainPage = () => {
    router.replace('/');
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='text-center mx-4 md:mx-8 lg:mx-16 xl:mx-32'>
        <div className='flex-shrink-0 flex items-center justify-center mb-4'>
          <Image
            src='/images/icons/character.svg'
            alt='character logo'
            width={100}
            height={100}
          />
          <Image
            src='/images/icons/character.svg'
            alt='character logo'
            width={80}
            height={80}
            className='ml-1 mt-6'
          />
        </div>

        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 whitespace-normal animate-appearance-in text-purple'>
          404 Not Found <br />
        </h1>
        <div>
          <p className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 whitespace-normal'>
            길을 잃으셨나요? 걱정 마세요, 함께 돌아가요 :)
          </p>
          <button
            onClick={goToMainPage}
            className='inline-block px-6 py-3 text-base sm:text-lg hover:text-purple animate-pulse'
          >
            메인 페이지로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
