import { getPlaceInfo } from '@/apis/places';
import { getLikesWithCommentsByPlaceId } from '@/apis/reviews';
import MainWrapper from '@/components/layout/MainWrapper';
import Carousel from '@/components/common/Carousel';
import { useQuery } from '@tanstack/react-query';
import PlaceDetail from '@/components/place_detail/PlaceDetail';
import Link from 'next/link';
import { formatDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/router';
import Seo from '@/components/layout/Seo';

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
        <div className='flex gap-6 px-6 mb-[20px] flex-wrap justify-center items-center'>
          {/* 리뷰카드 */}

          {reviews?.length === 0 ? (
            <p>등록된 리뷰가 없습니다</p>
          ) : (
            reviews?.map((review) => (
              <Link href={`/review/${review.id}`} key={review.id}>
                <div className='w-[300px] bg-slate-200 p-4 rounded-xl shadow-md'>
                  <div className='flex flex-col'>
                    {/* 이미지파트 */}
                    <div className='bg-slate-300 w-full h-[150px] mb-[10px]'>
                      Image
                    </div>

                    {/* 유저정보 파트 */}
                    <div className=' flex mb-[10px] items-center justify-between'>
                      <div className='flex items-center'>
                        {/* <div className='rounded-full w-[40px] h-[40px] mr-[6px] bg-slate-300'>
                          img
                        </div> */}
                        <span className='inline-block'>닉네임</span>
                      </div>
                      <div>
                        <span>{formatDate(review.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 내용파트 */}
                  <div>
                    <div className='text-right'>
                      <span className='mr-[6px]'>❤ {review.likes.length} </span>
                      <span className='mr-[6px]'>
                        💬 {review.comments.length}
                      </span>
                    </div>
                    <p className='w-[100%] h-[100px] p-2 mt-2 bg-white'>
                      {review.content}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </MainWrapper>
  );
};

export default PlacePage;
