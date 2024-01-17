import { fetchPlacesData } from '@/apis/places';
import PlaceCard2 from '@/components/common/PlaceCard2';
import { supabase } from '@/libs/supabase';
import { Tables } from '@/types/supabase';
import { Button, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {
  QueryFilters,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const PlacesPage = () => {
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

  const loadMoreData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
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
  return (
    <div>
      <form
        className='flex items-center justify-center'
        // onSubmit={loadMoreData}
      >
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
      </form>
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
    </div>
  );
};

export default PlacesPage;
