// Custom404.jsx

import React from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  const goToMainPage = () => {
    router.replace('/');
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center mx-4 md:mx-8 lg:mx-16 xl:mx-32'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 whitespace-normal animate-appearance-in text-purple'>
          404 Error <br />
        </h1>
        <div className='mb-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>
          비정상적인 접근입니다.
        </div>
        <div>
          <p className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl whitespace-normal'>
            길을 잃으셨나요? 걱정 마세요, 함께 돌아가요 :)
          </p>
          <button
            onClick={goToMainPage}
            className='mt-4 inline-block px-6 py-3 text-base sm:text-lg hover:text-purple animate-pulse'
          >
            메인 페이지로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
