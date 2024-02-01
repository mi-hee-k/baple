// src/pages/places/index.tsx
import PlaceCard from '@/components/common/PlaceCard';
import TopButton from '@/components/common/TopButton';
import MainWrapper from '@/components/layout/MainWrapper';
import Seo from '@/components/layout/Seo';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { RootState } from '@/redux/config/configStore';
import { setSearchValue } from '@/redux/modules/searchValueSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPlacesData } from '@/apis/places';
import { PlacesForSearch } from '@/types/types';

const PlacesPage = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const [realSearch, setRealSearch] = useState(searchValue);

  // const [placesData, setPlacesData] = useState();
  console.log({ realSearch });
  const dispatch = useDispatch();
  const currentPage = 1;

  useEffect(() => {
    //클린업함수 -> 언마운트 될때 redux state 빈 스트링으로 초기화
    return () => {
      dispatch(setSearchValue(''));
    };
  }, [dispatch]);

  const handleClickSearchBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRealSearch(searchValue);
  };

  const {
    data: places,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['places', realSearch, selected],
    queryFn: fetchPlacesData,
    initialPageParam: currentPage, // 초기 페이지 값 설정
    getNextPageParam: (lastPage, pages) => {
      if (lastPage) {
        if (lastPage?.page < lastPage?.total_pages) {
          return lastPage.page + 1;
        }
      }
    },
    select: (data) => {
      console.log('data', data);
      return data.pages.map((pageData) => pageData?.data).flat();
      // return data.pages;
    },
  });

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView || !hasNextPage) return;
      fetchNextPage();
    },
  });

  const handleClickBtns = (value: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value],
    );
  };
  const generateBtns = (value: string, label: string) => (
    <Button
      key={value}
      onClick={() => handleClickBtns(value)}
      color='primary'
      radius='full'
      variant={selected.includes(value) ? 'solid' : 'bordered'}
      className='w-full md:w-36'
    >
      {label}
    </Button>
  );

  return (
    <MainWrapper>
      <Seo />
      <form
        onSubmit={handleClickSearchBtn}
        className='flex justify-center w-full sm:w-[60%] m-auto mt-10 mb-4 sm:mb-8 bg-primary p-[2px] rounded-full overflow-hidden'
      >
        <input
          placeholder='장소이름을 검색하세요'
          value={searchValue}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          className='rounded-full w-[80%] sm:w-full p-2 px-4 placeholder:text-md focus:outline-none'
          autoFocus
        />
        <Button
          color='primary'
          type='submit'
          className='h-auto w-[20%] rounded-r-full'
        >
          <Image
            src='/images/icons/search_white.svg'
            width={24}
            height={24}
            alt='search_icon'
          />
        </Button>
      </form>
      {/* <span>
        {places !== undefined ? places[0]?.total_length?.toString() : '0'}개의
        검색 결과를 찾았어요!
      </span> */}
      <div className='flex gap-6 flex-col md:flex md:flex-row relative'>
        {/* 태그 */}
        <div className='grid grid-cols-2 sm:grid-cols-3 place-items-center md:w-36 md:flex md:flex-col gap-4'>
          {generateBtns('is_paid', '입장료')}
          {generateBtns('is_easy_door', '장애인용 출입문')}
          {generateBtns('is_wheelchair_rental', '휠체어 대여')}
          {generateBtns('is_guide_dog', '안내견 동반')}
          {generateBtns('is_braille_guide', '점자 가이드')}
          {generateBtns('is_audio_guide', '오디오 가이드')}
          {generateBtns('is_disabled_toilet', '장애인용 화장실')}
          {generateBtns('is_disabled_parking', '장애인용 주차장')}
        </div>
        {/* 카드 */}
        <div className='flex justify-center w-full'>
          <div className='grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 sm:gap-3 places-items-center w-full md:w-full'>
            {places?.map((place, idx) => (
              <PlaceCard key={idx} place={place} />
            ))}
          </div>
        </div>
        {places?.length === 0 ? (
          <div className='absolute w-full h-full mx-auto flex flex-col gap-3 justify-center items-center '>
            <Image
              src='/images/icons/character.svg'
              alt='main_character'
              width={100}
              height={100}
            />
            <span className='text-lg'>검색 결과가 없습니다 😅</span>
          </div>
        ) : null}
      </div>

      <div ref={ref} className='bg-blue w-full h-6'></div>
      <TopButton />
    </MainWrapper>
  );
};

export default PlacesPage;
