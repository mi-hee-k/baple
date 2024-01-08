import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className='bg-yellow-300 py-2 font-bold mb-8 sticky top-0 z-20 shadow-md'>
      <div className='container m-auto flex flex-row items-center max-w-[1200px] min-h-[48px] w-[90%]'>
        <nav className='flex flex-row gap-6'>
          <Link href='/'>BAPLE</Link>
          <Link href='/nearby'>주변 장소</Link>
          <Link href='/places'>장소 목록</Link>
          <Link href='/place/1234'>장소 상세</Link>
          <Link href='/review/1234'>리뷰 상세</Link>
          <Link href='/review/write'>리뷰 작성</Link>
          <Link href='/login'>로그인</Link>
          <Link href='/signup'>회원가입</Link>
          <Link href='/user/1234'>마이 페이지</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
