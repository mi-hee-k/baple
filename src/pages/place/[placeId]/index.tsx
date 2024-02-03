import { getPlaceInfo } from '@/apis/places';
import { getReviewsByPlaceIdrpc } from '@/apis/reviews';
import MainWrapper from '@/components/layout/MainWrapper';
import { useQuery } from '@tanstack/react-query';
import PlaceDetail from '@/components/place_details/PlaceDetailInfo';
import { useRouter } from 'next/router';
import Seo from '@/components/layout/Seo';
import _ from 'lodash';
import {
  CustomOverlayRoadview,
  Map,
  MapMarker,
  MapTypeControl,
  Roadview,
  RoadviewComponent,
  RoadviewMarker,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import CarouselThumb from '@/components/common/Carousel_Thumb';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import { toastSuccess, toastWarn } from '@/libs/toastifyAlert';
import PlaceDetailHeader from '@/components/place_details/PlaceDetailInfoHeader';
import { getBookmark } from '@/apis/bookmarks';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useCurrentTheme } from '@/hooks/useCurrentTheme';
import PlaceDetailReview from '@/components/place_details/placeDetailReview';

export type ToggleBookmarkType = () => void;
export type ShowAlertType = () => void;

const PlacePage = () => {
  const router = useRouter();
  const roadviewRef = useRef<kakao.maps.Roadview | null>(null);
  const placeId: string = router.query.placeId as string;
  const [toggle, setToggle] = useState('map');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [recentOrder, setRecentOrder] = useState(true);
  const { userId, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { insertBookmark, deleteBookmark } = useBookmarks(userId, placeId);
  const { baple } = useCurrentTheme();

  const { data: placeInfo, isLoading: placeInfoLoading } = useQuery({
    queryKey: ['placeInfo', placeId],
    queryFn: () => getPlaceInfo(placeId),
  });

  const { data: reviews, isLoading: reviewLoading } = useQuery({
    queryKey: ['reviews', placeId],
    queryFn: () => getReviewsByPlaceIdrpc(placeId),
    enabled: !!placeId,
    select: (data) => {
      const recentOrder = _.orderBy(data, 'created_at', 'desc');
      const likesOrder = _.orderBy(data, 'likes_count', 'desc');
      return { recentOrder, likesOrder };
    },
  });

  const { data: bookmarkState } = useQuery({
    queryKey: ['bookmark', userId, placeId],
    queryFn: () => getBookmark({ userId, placeId }),
    enabled: !!userId,
  });

  useEffect(() => {
    setIsBookmarked(bookmarkState ? bookmarkState.length > 0 : false);
  }, [bookmarkState]);

  const imgList = reviews?.recentOrder
    ?.map((item) => item.images_url)
    .flat()
    .filter((url) => url !== null) as string[];

  let placePosition = {
    lat: placeInfo?.lat,
    lng: placeInfo?.lng,
  };

  // 버튼 토글
  const toggleBookmark = () => {
    if (isBookmarked) {
      setIsBookmarked(false);
      deleteBookmark({ userId, placeId });
      toastSuccess('북마크가 해제되었습니다');
    } else {
      setIsBookmarked(true);
      insertBookmark({ userId, placeId });
      toastSuccess('북마크에 추가되었습니다');
    }
  };

  // 모달
  const showAlert = () => {
    toastWarn('로그인 후 이용해 주세요');
  };

  if (placeInfoLoading || reviewLoading) {
    return (
      <div className='w-[100%] h-[90vh] flex items-center justify-center'>
        <Spinner
          label='로딩중!'
          color='primary'
          size='lg'
          labelColor='primary'
        />
      </div>
    );
  }

  const Content = () => {
    return (
      <div className='bg-white  text-black w-[250px] h-[100px] rounded-[20px] flex items-center justify-center text-[20px] font-bold text-wrap p-4'>
        <p>{placeInfo.place_name}</p>
        <div className='w-5 h-5 bg-white absolute bottom-[-10px] rotate-45'></div>
      </div>
    );
  };

  return (
    <>
      <MainWrapper>
        <Seo title={`${placeInfo.place_name} | `} />
        {/* 장소 상세정보 - 모바일에서만 보임 */}
        <div className='flex items-center justify-between w-full mb-[20px] md:hidden'>
          <PlaceDetailHeader
            placeId={placeId}
            placeInfo={placeInfo}
            isLoggedIn={isLoggedIn}
            isBookmarked={isBookmarked}
            toggleBookmark={toggleBookmark}
            showAlert={showAlert}
          />
        </div>
        {/* 이미지 캐러셀 */}
        <div className='flex flex-col items-center justify-start h-auto md:h-[500px] mb-[50px] mt-[10px] md:mt-[80px] md:flex-row md:justify-between'>
          <div className='w-full mb-[30px] md:mb-0 md:mr-[30px] md:w-[40%]'>
            {imgList && (
              <CarouselThumb
                slideData={
                  imgList.length !== 0
                    ? imgList
                    : ['/images/default_image2.png']
                } // imgList가 없으면 빈배열
              />
            )}
          </div>
          {/* 장소 상세정보 */}
          <PlaceDetail
            placeInfo={placeInfo}
            placeId={placeId}
            isLoggedIn={isLoggedIn}
            isBookmarked={isBookmarked}
            toggleBookmark={toggleBookmark}
            showAlert={showAlert}
          />
        </div>

        {/* 지도 */}
        <section className='mb-[30px] relative'>
          {toggle === 'map' && (
            <Map
              center={placePosition}
              draggable={false}
              // zoomable={true}
              scrollwheel={false}
              keyboardShortcuts={true}
              style={{
                // 지도의 크기
                width: '100%',
                height: '300px',
              }}
              level={4}
              minLevel={8}
            >
              <MapMarker
                position={placePosition}
                image={{
                  src: `/images/icons/${
                    baple ? 'marker.svg' : 'CBicons/CBmarker.svg'
                  }`, // 마커이미지의 주소입니다
                  size: {
                    width: 44,
                    height: 40,
                  },
                }}
              />
              <Button
                className='absolute flex z-10 top-[3px] left-[130px] w-[90px] h-[32px] justify-center'
                variant='solid'
                color='primary'
                onClick={() => setToggle('roadview')}
                title='지도 보기'
              >
                로드뷰 보기
              </Button>
              <MapTypeControl position={'TOPLEFT'} />
              <ZoomControl position={'LEFT'} />
            </Map>
          )}

          {toggle === 'roadview' && (
            <Roadview
              position={{ ...placePosition, radius: 200 }}
              style={{
                width: '100%',
                height: '300px',
              }}
              ref={roadviewRef}
            >
              {/* <RoadviewMarker position={placePosition} /> */}
              <Button
                className='absolute top-[5px] left-[5px] z-10 flex w-[90px] h-[32px] justify-center'
                variant='solid'
                color='primary'
                onClick={() => setToggle('map')}
                title='지도 보기'
              >
                지도
              </Button>
              <CustomOverlayRoadview
                position={placePosition}
                xAnchor={0.5}
                yAnchor={0.5}
                onCreate={(overlay) => {
                  const roadview = roadviewRef.current;

                  if (!roadview) {
                    return;
                  }

                  const projection = roadview.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.
                  // 커스텀오버레이의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
                  console.log(overlay.getPosition());
                  const viewpoint = projection.viewpointFromCoords(
                    overlay.getPosition(),
                    overlay.getAltitude(),
                  );
                  roadview.setViewpoint(viewpoint); //커스텀 오버레이를 로드뷰의 가운데에 오도록 로드뷰의 시점을 변화 시킵니다.
                }}
              >
                <Content />
              </CustomOverlayRoadview>
            </Roadview>
          )}
        </section>

        {/* 리뷰 */}
        <PlaceDetailReview
          placeId={placeId}
          recentOrder={recentOrder}
          setRecentOrder={setRecentOrder}
          reviews={reviews}
        />
      </MainWrapper>
    </>
  );
};

export default PlacePage;
