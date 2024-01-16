import { searchPlaces } from '@/apis/places';
import PlaceCard2 from '@/components/common/PlaceCard2';
import { supabase } from '@/libs/supabase';
import { Tables } from '@/types/supabase';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

const PlacesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedPlaces, setSearchedPlaces] = useState<Tables<'places'>[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const pageSize = 20; // 페이지당 장소 수

  console.log('searchValue', searchValue);

  const loadMoreData = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .ilike('place_name', `%${searchValue}%`)
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

      if (error) {
        console.error('데이터 가져오기 에러:', error.message);
      } else {
        console.log('페이징 및 필터링된 데이터:', data);
        setSearchedPlaces([...searchedPlaces, ...data]); // 기존 데이터와 새로운 데이터 병합
        setCurrentPage((prev) => prev + 1); // 다음 페이지로 이동
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const currentPage = 1; // 현재 페이지

    const { data, error } = await supabase
      .from('places')
      .select()
      .ilike('place_name', `%${searchValue}%`)
      .range((currentPage - 1) * pageSize, currentPage * pageSize - 1); // 페이징
    if (error) {
      console.error('데이터 가져오기 에러:', error.message);
    } else {
      console.log('페이징 및 필터링된 데이터:', data);
      setSearchedPlaces(data);
    }
  };

  console.log('searchedPlaces', searchedPlaces);
  return (
    <div>
      <form
        className='flex items-center justify-center'
        onSubmit={onSubmitHandler}
      >
        <Input
          placeholder='검색어를 입력하세요'
          value={searchValue}
          onValueChange={setSearchValue}
          className='w-96'
        />
        <Button color='primary' type='submit' className='h-12'>
          검색
        </Button>
      </form>
      <div className='grid grid-cols-4'>
        {searchedPlaces.map((place) => (
          <PlaceCard2 key={place.id} place={place} />
        ))}
      </div>
      <Button onClick={loadMoreData} disabled={loading}>
        더보기
      </Button>
    </div>
  );
};

export default PlacesPage;
