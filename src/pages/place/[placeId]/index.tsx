import { getPlaceInfo } from '@/apis/places';
import { getReviewByPlaceId } from '@/apis/reviews';
import MainWrapper from '@/components/layout/MainWrapper';
import Carousel from '@/components/common/Carousel';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import PlaceDetail from '@/components/place_detail/PlaceDetail';
import Link from 'next/link';
import { formatDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/router';

const PlacePage = () => {
  // const {place} = useParams<{ placeId: string }>();
  // console.log(params);

  // const placeId = params.placeId;
  const router = useRouter();
  console.log('router', router);

  const placeId: string = router.query.placeId as string;

  const { data: placeInfo, isLoading: placeInfoLoading } = useQuery({
    queryKey: ['placeInfo', placeId],
    queryFn: () => getPlaceInfo(placeId),
  });

  const { data: reviews, isLoading: reviewLoading } = useQuery({
    queryKey: ['reviews', placeId],
    queryFn: () => getReviewByPlaceId(placeId),
  });

  const imgList = reviews?.map((item) => item.images_url).flat() as string[];

  if (placeInfoLoading || reviewLoading) {
    return <div>Loading...</div>;
  }

  console.log('reviews', reviews);

  return (
    <MainWrapper>
      {imgList && (
        <Carousel
          slideData={imgList ?? []} // imgList가 없으면 빈배열
          slidesPerView={4} // 보여줄 슬라이스 수
          slideHeight={'200px'} // 캐러셀 높이
        />
      )}

      {/* 장소 상세정보 */}
      <PlaceDetail placeInfo={placeInfo} />

      {/* 지도 */}
      <section className='mb-[30px]'>
        <div className='w-[80%] h-[300px] bg-blue-400 mx-auto'>지도</div>
      </section>
      <section className='mb-[30px] text-center'>
        <Link href={'/review/write'}>
          <button className='bg-red-400 p-4 rounded-md text-white'>
            리뷰 작성하기
          </button>
        </Link>
      </section>

      {/* 리뷰 */}
      <section>
        <h2 className='mb-[50px] text-3xl font-bold text-center'>방문 후기</h2>
        <div className='flex gap-6 px-6 mb-[20px]'>
          {/* 리뷰카드 */}
          {reviews?.map((review) => (
            <div
              className='w-[300px] bg-slate-200 p-4 rounded-xl shadow-md'
              key={review.id}
            >
              <div className='flex items-center justify-between'>
                {/* 리뷰헤더1 */}
                <div className=' flex mb-[10px]'>
                  <div className='rounded-full w-[40px] h-[40px] mr-[10px] bg-slate-300'></div>
                  <span className='inline-block'>닉네임</span>
                </div>
                {/* 리뷰헤더2 */}
                <div>
                  <span>{formatDate(review.created_at)}</span>
                </div>
              </div>
              {/* 이미지파트 */}
              <div className='bg-slate-300 h-[150px] mb-[10px]'>Image</div>
              {/* 내용파트 */}
              <div>
                <span>❤</span>
                <span>💬</span>
                <p className='w-[100%] h-[100px] p-2 mt-2 bg-white'>
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainWrapper>
  );
};

export default PlacePage;
