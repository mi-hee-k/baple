import { deleteBookmark, getBookmark, insertBookmark } from '@/apis/bookmark';
import { RootState } from '@/redux/config/configStore';
import { Tables } from '@/types/supabase';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Bookmark, BookmarkSolid } from 'iconoir-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface PlaceInfoAllData {
  placeId: string;
  placeInfo: Tables<'places'>;
}

const PlaceDetail = ({ placeInfo, placeId }: PlaceInfoAllData) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth);
  console.log(userInfo);
  const { place_name, tel, address, working_hours, holidays, lat, lng } =
    placeInfo;
  console.log(lat, lng);

  const isInfoArray = [
    placeInfo.is_audio_guide,
    placeInfo.is_braille_guide,
    placeInfo.is_disabled_parking,
    placeInfo.is_disabled_toilet,
    placeInfo.is_easy_door,
    placeInfo.is_guide_dog,
    placeInfo.is_paid,
    placeInfo.is_wheelchair_rental,
  ];

  const infoDetails = [
    '오디오 가이드',
    '점자 가이드',
    '장애인 주차장',
    '장애인 화장실',
    '장애인용 출입문',
    '안내견 동반',
    '입장료 있음',
    '휠체어 대여',
  ];

  const queryClient = new QueryClient();

  const toggleBookmark = () => {
    if (isBookmarked) {
      setIsBookmarked(false);
      addBookmark({ userId: userInfo.userId, placeId });
      console.log(isBookmarked);
    } else {
      setIsBookmarked(true);
      delBookmark(placeId);
      console.log(isBookmarked);
    }
  };

  const { mutate: addBookmark } = useMutation({
    mutationFn: insertBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark'] });
    },
  });

  const { mutate: delBookmark } = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark'] });
    },
  });

  return (
    <section>
      <div className=' flex justify-between'>
        <div className='flex'>
          <h1 className='text-2xl text-bold mb-[10px] mr-[4px]'>
            {place_name}
          </h1>

          {isBookmarked ? (
            <Bookmark className='cursor-pointer' onClick={toggleBookmark} />
          ) : (
            <BookmarkSolid
              className='cursor-pointer'
              onClick={toggleBookmark}
            />
          )}
        </div>
        <div>icons</div>
      </div>
      <div className='mb-[10px]'>
        <p>전화 : {tel}</p>
        <p>주소 : {address}</p>
        <p>운영시간 : {working_hours}</p>
        <p>휴무일 : {holidays === 'null' ? '정보없음' : holidays}</p>
      </div>
      <div className='flex gap-2 mb-[30px] flex-wrap'>
        {isInfoArray.map((item, index) => (
          <div key={index}>
            {item && (
              <span className='bg-green-300 rounded-xl px-4 py-1'>
                {infoDetails[index]}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlaceDetail;
