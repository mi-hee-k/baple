import { getPlaceInfo } from '@/apis/places';
import {
  getLikesWithCommentsByPlaceId,
  getReviewsByPlaceIdrpc,
} from '@/apis/reviews';
import MainWrapper from '@/components/layout/MainWrapper';
import Carousel from '@/components/common/Carousel';
import { useQuery } from '@tanstack/react-query';
import PlaceDetail from '@/components/place_detail/PlaceDetail';
import { useRouter } from 'next/router';
import Seo from '@/components/layout/Seo';

import ReviewCard from '@/components/common/ReviewCard';
import {
  Map,
  MapMarker,
  MapTypeControl,
  Roadview,
  RoadviewMarker,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import ReviewCard2 from '@/components/common/ReviewCard2';

const PlacePage = () => {
  const router = useRouter();
  const placeId: string = router.query.placeId as string;
  const [toggle, setToggle] = useState('map');

  const { data: placeInfo, isLoading: placeInfoLoading } = useQuery({
    queryKey: ['placeInfo', placeId],
    queryFn: () => getPlaceInfo(placeId),
  });

  const { data: reviews, isLoading: reviewLoading } = useQuery({
    queryKey: ['reviews', placeId],
    queryFn: () => getReviewsByPlaceIdrpc(placeId),
    enabled: !!placeId,
  });

  // const { data: rpcplacereviews } = useQuery({
  //   queryKey: ['rpcreviews', placeId],
  //   queryFn: () => getReviewsByPlaceIdrpc(placeId),
  //   enabled: !!placeId,
  // });
  // console.log('rpcreviews', rpcplacereviews);

  console.log('reviews가 뭐라 찍히지?', reviews);

  const imgList = reviews
    ?.map((item) => item.images_url)
    .flat()
    .filter((url) => url !== null) as string[];
  // console.log('imgList', imgList);
  let placePosition = {
    lat: placeInfo?.lat,
    lng: placeInfo?.lng,
  };

  if (placeInfoLoading || reviewLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainWrapper>
      <Seo title={placeInfo.place_name} />
      {/* 이미지 캐러셀 */}
      {imgList && (
        <Carousel
          slideData={imgList ?? []} // imgList가 없으면 빈배열
          slidesPerView={4} // 보여줄 슬라이스 수
          slideHeight={'200px'} // 캐러셀 높이
        />
      )}

      {/* 장소 상세정보 */}
      <PlaceDetail placeInfo={placeInfo} placeId={placeId} />

      {/* 지도 */}
      <section className='mb-[30px] relative'>
        <Map
          center={placePosition}
          draggable={false}
          style={{
            // 지도의 크기
            width: '100%',
            height: '500px',
            display: toggle === 'map' ? 'block' : 'none',
          }}
          level={5}
          maxLevel={5}
        >
          <MapMarker position={placePosition} />
          {toggle === 'map' && (
            <Button
              className='absolute flex  z-10 top-[3px] left-[130px] w-[90px] h-[32px] justify-center'
              variant='solid'
              color='primary'
              onClick={() => setToggle('roadview')}
              title='지도 보기'
            >
              로드맵 보기
            </Button>
          )}
          <MapTypeControl position={'TOPLEFT'} />
          <ZoomControl position={'LEFT'} />
        </Map>

        <Roadview
          position={{ ...placePosition, radius: 200 }}
          style={{
            display: toggle === 'roadview' ? 'block' : 'none',
            width: '100%',
            height: '500px',
          }}
        >
          <RoadviewMarker position={placePosition} />
          {toggle === 'roadview' && (
            <Button
              className='absolute top-[5px] left-[5px] z-10 flex w-[90px] h-[32px] justify-center'
              variant='solid'
              color='primary'
              onClick={() => setToggle('map')}
              title='지도 보기'
            >
              지도
            </Button>
          )}
          <RoadviewMarker position={placePosition}>
            <div className='flex justify-center items-center rounded-[20px]'>
              {placeInfo.place_name}
            </div>
          </RoadviewMarker>
        </Roadview>
      </section>
      <section className='mb-[30px] text-center'>
        <button
          className='bg-red-400 p-4 rounded-md text-white'
          onClick={() => router.push(`/review/write/${placeId}`)}
        >
          리뷰 작성하기
        </button>
      </section>

      {/* 리뷰 */}
      <section>
        <h2 className='mb-[50px] text-3xl font-bold text-center'>방문 후기</h2>
        <div className='flex flex-col justify-center gap-y-5 items-center'>
          {/* 리뷰카드 */}
          {reviews?.length === 0 ? (
            <p>등록된 리뷰가 없습니다</p>
          ) : (
            reviews?.map((review) => (
              <ReviewCard2 key={review.id} review={review} />
            ))
          )}
        </div>
      </section>
      {/* <section>
        {reviews?.map((review) => (
          <ReviewCard2 key={review.id} review={review} />
        ))}
      </section> */}
    </MainWrapper>
  );
};

export default PlacePage;
