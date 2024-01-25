import PlaceCard from '@/components/common/PlaceCard';
import PlaceCard2 from '@/components/common/PlaceCard2';
import TopButton from '@/components/common/TopButton';
import MainWrapper from '@/components/layout/MainWrapper';
import { supabase } from '@/libs/supabase';
import { Tables } from '@/types/supabase';
import { PlacesForSearch } from '@/types/types';
import { Button, Input, Spacer } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const PlacesPage = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [checkboxChanged, setCheckboxChanged] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchedPlaces, setSearchedPlaces] = useState<PlacesForSearch[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 20;

  useEffect(() => {
    handleSearch();
  }, [selected]);

  useEffect(() => {
    if (checkboxChanged) {
      loadMoreData();
      setCheckboxChanged(false);
    }
  }, [checkboxChanged, selected]);

  const handleSearch = () => {
    setSearchedPlaces([]);
    setCurrentPage(1);
    setCheckboxChanged(true);
  };

  const handleClickSearch = () => {
    handleSearch();
    loadMoreData();
  };

  const loadMoreData = async () => {
    setLoading(true);

    try {
      let query = supabase.rpc('search_places', {
        p_search_value: searchValue,
      });

      if (selected.length > 0) {
        selected.forEach((checkbox) => {
          query = query.in(checkbox, [true]);
        });
      }

      const { data, error } = await query.range(
        (currentPage - 1) * pageSize,
        currentPage * pageSize - 1,
      );

      if (!error) {
        if (data.length === 0) {
          return;
        }
        setSearchedPlaces([...searchedPlaces, ...data]);
        setCurrentPage((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView) return;
      loadMoreData();
    },
  });

  const handleCheckboxClick = (value: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value],
    );
    setCheckboxChanged(true);
  };

  const checkboxButton = (value: string, label: string) => (
    <Button
      key={value}
      onClick={() => handleCheckboxClick(value)}
      color='primary'
      radius='full'
      size='lg'
      variant={selected.includes(value) ? 'solid' : 'bordered'}
      className='w-28 md:w-full'
    >
      {label}
    </Button>
  );

  return (
    <MainWrapper>
      <div className='flex justify-center my-10'>
        <Input
          placeholder='장소이름을 검색하세요'
          value={searchValue}
          onValueChange={setSearchValue}
          className='rounded-3xl w-96'
        />
        <Button
          color='primary'
          type='submit'
          className='h-auto'
          onClick={handleClickSearch}
        >
          {/* <Image
            src='/images/icons/search.svg'
            width={30}
            height={30}
            alt='bookmark_icon'
            className='object-cover'
          /> */}
          검색
        </Button>
      </div>
      <div className='flex gap-6 flex-col md:flex md:flex-row'>
        {/* 태그 */}
        <div className='grid grid-cols-3 place-items-center md:flex md:flex-col gap-4 '>
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
        <div className='flex justify-center'>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3'>
            {searchedPlaces.map((place, idx) => (
              <PlaceCard key={idx} place={place} />
            ))}
          </div>
        </div>
        <div ref={ref}></div>
      </div>
      <TopButton />
    </MainWrapper>
  );
};

export default PlacesPage;
