import { getImgList } from '@/apis/place_detail';
import MainWrapper from '@/components/layout/MainWrapper';
import Carousel from '@/components/place_detail/Carousel';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

interface Slide {
  id: number;
  img: string;
}

const slideData: Slide[] = [
  {
    id: 1,
    img: 'https://image.edaily.co.kr/images/photo/files/NP/S/2023/03/PS23033001084.jpg',
  },
  {
    id: 2,
    img: 'https://mblogthumb-phinf.pstatic.net/MjAxNzA1MjNfMjE2/MDAxNDk1NTI5NjAzMTg2.xBtUxURqSfVkj4PQvpHFhXUXfo8_8Oz0ZO5W3xE_l00g.ZxxTHEYUScpC6MuH0vorMjC9C-txie9GmRY56YDvCFkg.JPEG.suwonloves/%EC%B0%BD%EB%A3%A1%EB%AC%B8%EB%8C%80%EB%A1%9C_%EA%BD%83%EB%B0%AD_18.jpg?type=w800',
  },
  {
    id: 3,
    img: 'https://image.edaily.co.kr/images/photo/files/NP/S/2023/03/PS23033001084.jpg',
  },
  {
    id: 4,
    img: 'https://mblogthumb-phinf.pstatic.net/MjAxNzA1MjNfMjE2/MDAxNDk1NTI5NjAzMTg2.xBtUxURqSfVkj4PQvpHFhXUXfo8_8Oz0ZO5W3xE_l00g.ZxxTHEYUScpC6MuH0vorMjC9C-txie9GmRY56YDvCFkg.JPEG.suwonloves/%EC%B0%BD%EB%A3%A1%EB%AC%B8%EB%8C%80%EB%A1%9C_%EA%BD%83%EB%B0%AD_18.jpg?type=w800',
  },
  {
    id: 5,
    img: 'https://image.edaily.co.kr/images/photo/files/NP/S/2023/03/PS23033001084.jpg',
  },
];

const PlacePage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  console.log(placeId);

  // const placeId = 'bf2dafff-f2a1-41ff-942f-056a242e53f1';

  const { data: imgList, isLoading } = useQuery({
    queryKey: ['imgList'],
    queryFn: () => getImgList(placeId),
  });

  // console.log(imgList?.images_url);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainWrapper>
      <Carousel
        slideData={imgList?.images_url}
        slidesPerView={4}
        slideHeight={'200px'}
      />

      <section>
        <div className='flex justify-between'>
          <h1 className='text-2xl text-bold mb-[10px]'>국립중앙박물관 🏷</h1>
          <div>icons</div>
        </div>
        <div className='mb-[10px]'>
          <p>홈페이지 : www.google.com</p>
          <p>전화 : 02-000-0000</p>
          <p>주소 : 서울특별시 용산구 용산동6가 168-6</p>
          <p>운영시간 : 월, 화, 목, 금, 일요일: 10:00-18:00</p>
          <p>휴무일 : 공휴일</p>
        </div>

        <div className='flex gap-6 mb-[20px]'>
          <span className='bg-green-300 rounded-xl px-2'>입장료무료</span>
          <span className='bg-green-300 rounded-xl px-2'>장애인용 출입문</span>
          <span className='bg-green-300 rounded-xl px-2'>휠체어 대여</span>
          <span className='bg-green-300 rounded-xl px-2'>장애인 화장실</span>
          <span className='bg-green-300 rounded-xl px-2'>안내견 동반</span>
          <span className='bg-green-300 rounded-xl px-2'>안내 점자</span>
          <span className='bg-green-300 rounded-xl px-2'>오디오 가이드</span>
        </div>
      </section>

      <section className='mb-[30px]'>
        <div className='w-[80%] h-[300px] bg-blue-400 mx-auto'>지도</div>
      </section>

      <section className='mb-[30px] text-center'>
        <button className='bg-red-400 p-4 rounded-md text-white'>
          리뷰 작성하기
        </button>
      </section>

      <section>
        <h2 className='mb-[50px] text-3xl font-bold text-center'>방문 후기</h2>
        {/* 리뷰섹션 */}
        <div className='flex gap-6 px-6 mb-[20px]'>
          {/* 리뷰카드 */}
          <div className='w-[300px] bg-slate-200 p-4 rounded-xl shadow-md'>
            <div className='flex items-center justify-between'>
              {/* 리뷰헤더1 */}
              <div className=' flex mb-[10px]'>
                <div className='rounded-full w-[40px] h-[40px] mr-[10px] bg-slate-300'></div>
                <span className='inline-block'>닉네임</span>
              </div>
              {/* 리뷰헤더2 */}
              <div>
                <span>2024.01.08</span>
                <span>✏</span>
                <span>🗑</span>
              </div>
            </div>
            {/* 이미지파트 */}
            <div className='bg-slate-300 h-[150px] mb-[10px]'>Image</div>
            {/* 내용파트 */}
            <div>
              <span>❤</span>
              <span>💬</span>
              <p className='w-[100%] h-[100px] p-2 mt-2 bg-white'>
                편리하게 잘 되어 있어요!
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainWrapper>
  );
};

export default PlacePage;
