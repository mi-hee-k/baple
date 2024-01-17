import PlaceCard2 from '@/components/common/PlaceCard2';
import { supabase } from '@/libs/supabase';
import { Tables } from '@/types/supabase';
import { Button, Input, CheckboxGroup, Checkbox } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  QueryFilters,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const PlacesPage = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchedPlaces, setSearchedPlaces] = useState<Tables<'places'>[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const queryClient = useQueryClient();
  const pageSize = 20; // 페이지당 장소 수
  // let currentPage = 1;

  console.log('searchValue', searchValue);
  useEffect(() => {
    // 새로운 검색어가 입력될 때 기존에 검색된 장소를 비움
    setSearchedPlaces([]);
    setCurrentPage(1);
  }, [searchValue]);

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
        if (data.length === 0) {
          setIsFinished(true);
          return;
        }

        console.log('페이징 및 필터링된 데이터:', data);
        setSearchedPlaces([...searchedPlaces, ...data]); // 기존 데이터와 새로운 데이터 병합
        setCurrentPage((prev) => prev + 1); // 다음 페이지로 이동
      }
    } finally {
      setLoading(false);
    }
  };
  console.log('CurrentPage', currentPage);
  /*
  const {
    data: places,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['places', searchValue],
    queryFn: fetchPlacesData,
    initialPageParam: currentPage, // 초기 페이지 값 설정
    getNextPageParam: (lastPage, allPages) => {
      const totalPage = allPages.flat().length;
      console.log('lastPage', lastPage);
      console.log('allPages', allPages);
      console.log('totalPage', totalPage);
      // return totalPage < pageSize * currentPage ? currentPage + 1 : undefined;
      return (currentPage += 1);
    },
  });

  const fetchMore = () => {
    if (!hasNextPage) return;
    console.log('fetchMore함수 실행');
    fetchNextPage();
  };

  console.log('places!!!!', places);
*/

  console.log('searchedPlaces', searchedPlaces);
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView) return;
      loadMoreData();
    },
  });
  return (
    <div>
      <div className='flex flex-col gap-3'>
        <CheckboxGroup
          label='편의시설'
          color='warning'
          value={selected}
          onValueChange={setSelected}
        >
          <Checkbox value='is_paid'>입장료</Checkbox>
          <Checkbox value='장애인용 출입문'>장애인용 출입문</Checkbox>
          <Checkbox value='휠체어 대여'>휠체어 대여</Checkbox>
          <Checkbox value='안내견 동반'>안내견 동반</Checkbox>
          <Checkbox value='점자 가이드'>점자 가이드</Checkbox>
          <Checkbox value='오디오 가이드'>오디오 가이드</Checkbox>
          <Checkbox value='장애인용 화장실'>장애인용 화장실</Checkbox>
          <Checkbox value='장애인용 주차장'>장애인용 주차장</Checkbox>
        </CheckboxGroup>
        <p className='text-default-500 text-small'>
          Selected: {selected.join(', ')}
        </p>
      </div>
      <div className='flex justify-center'>
        <Input
          placeholder='검색어를 입력하세요'
          value={searchValue}
          onValueChange={setSearchValue}
          className='w-96'
        />
        <Button
          color='primary'
          type='submit'
          className='h-12'
          onClick={loadMoreData}
        >
          검색
        </Button>
      </div>
      <div className='grid grid-cols-4'>
        {/* {places?.pages?.map((page) =>
          page.map((place: Tables<'places'>, idx: number) => (
            <PlaceCard2 key={idx} place={place} />
          )),
        )} */}
        {searchedPlaces.map((place, idx) => (
          <PlaceCard2 key={idx} place={place} />
        ))}
      </div>
      {searchedPlaces.length === 0 || isFinished ? null : (
        <div className='w-full flex justify-center m-2'>
          <Button onClick={loadMoreData} isDisabled={loading} color='primary'>
            더보기
          </Button>
        </div>
      )}
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'green',
          color: 'white',
          width: '100%',
          height: 50,
        }}
        ref={ref}
      >
        Trigger to Fetch Here
      </div>
    </div>
  );
};

export default PlacesPage;
