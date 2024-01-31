// src/pages/places/index.tsx
import PlaceCard from '@/components/common/PlaceCard';
import TopButton from '@/components/common/TopButton';
import MainWrapper from '@/components/layout/MainWrapper';
import Seo from '@/components/layout/Seo';
import { supabase } from '@/libs/supabase';
import { PlacesForSearch } from '@/types/types';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { RootState } from '@/redux/config/configStore';
import { setSearchValue } from '@/redux/modules/searchValueSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPlacesData } from '@/apis/places';

const PlacesPage = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchedPlaces, setSearchedPlaces] = useState<PlacesForSearch[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const pageSize = 21;
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const [realSearch, setRealSearch] = useState(searchValue);
  console.log({ realSearch });
  const dispatch = useDispatch();
  let currentPage = 1;

  // useEffect(() => {
  //   const fetchFilteredData = async () => {
  //     setSearchedPlaces((prev) => []);
  //     setCurrentPage(1);
  //     let query = supabase.rpc('search_places', {
  //       p_search_value: searchValue,
  //     });
  //     if (selected.length > 0) {
  //       selected.forEach((checkbox) => {
  //         query = query.in(checkbox, [true]);
  //       });
  //     }
  //     // console.log('Query:', query);

  //     const { data, error } = await query.range(
  //       (currentPage - 1) * pageSize,
  //       currentPage * pageSize - 1,
  //     );
  //     setSearchedPlaces([...data]);
  //   };
  //   fetchFilteredData();
  // }, [selected]);

  useEffect(() => {
    //클린업함수 -> 언마운트 될때 redux state 빈 스트링으로 초기화
    return () => {
      dispatch(setSearchValue(''));
    };
  }, [dispatch]);

  const handleClickSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRealSearch(searchValue);
  };

  // const loadMoreData = async () => {
  //   let query = supabase.rpc('search_places', {
  //     p_search_value: searchValue,
  //   });
  //   if (selected.length > 0) {
  //     selected.forEach((checkbox) => {
  //       query = query.in(checkbox, [true]);
  //     });
  //   }
  //   const { data, error } = await query.range(
  //     (currentPage - 1) * pageSize,
  //     currentPage * pageSize - 1,
  //   );
  //   if (!error) {
  //     if (data.length === 0) {
  //       return;
  //     }
  //     setSearchedPlaces([...searchedPlaces, ...data]);
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // };

  const {
    data: places,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['places', realSearch, selected],
    queryFn: fetchPlacesData,
    initialPageParam: currentPage, // 초기 페이지 값 설정
    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage', lastPage);
      console.log('allPages', allPages);
      if (lastPage) {
        if (lastPage?.page < lastPage?.total_pages) {
          return lastPage.page + 1;
        }
      }
    },
    select: (data) => {
      return data.pages.map((pageData) => pageData?.data).flat();
    },
  });

  console.log('places!!!!', places);

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView || !hasNextPage) return;
      fetchNextPage();
    },
  });

  const handleCheckboxClick = (value: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value],
    );
  };
  const checkboxButton = (value: string, label: string) => (
    <Button
      key={value}
      onClick={() => handleCheckboxClick(value)}
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
        onSubmit={handleClickSearch}
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
      <div className='flex gap-6 flex-col md:flex md:flex-row'>
        {/* 태그 */}
        <div className='grid grid-cols-2 sm:grid-cols-3 place-items-center md:w-36 md:flex md:flex-col gap-4'>
          {checkboxButton('is_paid', '입장료')}
          {checkboxButton('is_easy_door', '장애인용 출입문')}
          {checkboxButton('is_wheelchair_rental', '휠체어 대여')}
          {checkboxButton('is_guide_dog', '안내견 동반')}
          {checkboxButton('is_braille_guide', '점자 가이드')}
          {checkboxButton('is_audio_guide', '오디오 가이드')}
          {checkboxButton('is_disabled_toilet', '장애인용 화장실')}
          {checkboxButton('is_disabled_parking', '장애인용 주차장')}
        </div>
        {/* 카드 */}
        <div className='flex justify-center w-full'>
          <div className='grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 sm:gap-3 places-items-center w-full md:w-full'>
            {/* {searchedPlaces.map((place, idx) => (
              <PlaceCard key={idx} place={place} />
            ))} */}
            {places?.map((place, idx) => (
              <PlaceCard key={idx} place={place} />
            ))}
          </div>
        </div>
      </div>
      <div ref={ref} className='bg-blue w-full'>
        Trigger Fetch here
      </div>
      <TopButton />
    </MainWrapper>
  );
};

export default PlacesPage;
