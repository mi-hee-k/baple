import { getPlaceInfo } from '@/apis/places';
import { getLikesWithCommentsByPlaceId } from '@/apis/reviews';
import MainWrapper from '@/components/layout/MainWrapper';
import Carousel from '@/components/common/Carousel';
import { useQuery } from '@tanstack/react-query';
import PlaceDetail from '@/components/place_detail/PlaceDetail';
import { useRouter } from 'next/router';
import Seo from '@/components/layout/Seo';

import ReviewCard from '@/components/common/ReviewCard';

const PlacePage = () => {
  const router = useRouter();
  const placeId: string = router.query.placeId as string;

  const { data: placeInfo, isLoading: placeInfoLoading } = useQuery({
    queryKey: ['placeInfo', placeId],
    queryFn: () => getPlaceInfo(placeId),
  });

  const { data: reviews, isLoading: reviewLoading } = useQuery({
    queryKey: ['reviews', placeId],
    queryFn: () => getLikesWithCommentsByPlaceId(placeId),
  });

  const imgList = reviews
    ?.map((item) => item.images_url)
    .flat()
    .filter((url) => url !== null) as string[];
  // console.log('imgList', imgList);

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
      <section className='mb-[30px]'>
        <div className='w-[80%] h-[300px] bg-blue-400 mx-auto'>지도</div>
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
        <div className='grid grid-cols-4 gap-6 mb-[20px] flex-wrap justify-center items-center'>
          {/* 리뷰카드 */}
          {reviews?.length === 0 ? (
            <p>등록된 리뷰가 없습니다</p>
          ) : (
            reviews?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </section>
    </MainWrapper>
  );
};

export default PlacePage;
