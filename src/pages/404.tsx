// Custom404.jsx

import React from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  const goToMainPage = () => {
    router.replace('/');
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-conic'>
      <div className='text-center'>
        <h1 className='text-5xl font-bold mb-4'>
          404 - 비정상적인 접근입니다.
        </h1>
        <p className='text-lg'>길을 잃으셨나요? 함께 돌아가요</p>
        <button
          onClick={goToMainPage}
          className='mt-4 inline-block px-6 py-3  rounded-full font-semibold transition duration-300 hover:text-white'
        >
          메인 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
