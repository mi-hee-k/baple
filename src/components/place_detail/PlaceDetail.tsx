import { deleteBookmark, getBookmark, insertBookmark } from '@/apis/bookmarks';
import { RootState } from '@/redux/config/configStore';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface PlaceInfoAllData {
  placeId: string;
  placeInfo: Tables<'places'>;
}

const PlaceDetail = ({ placeInfo, placeId }: PlaceInfoAllData) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.auth);
  console.log(userInfo);
  const { place_name, tel, address, working_hours, holidays, lat, lng } =
    placeInfo;
  const queryClient = useQueryClient();

  const { data: bookmarkList } = useQuery({
    queryKey: ['bookmark', userInfo.userId, placeId],
    queryFn: () => getBookmark(userInfo.userId, placeId),
  });

  useEffect(() => {
    setIsBookmarked(bookmarkList ? bookmarkList.length > 0 : false);
  }, [bookmarkList]);

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

  const addBookmark = useMutation({
    mutationFn: insertBookmark,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['bookmark', userInfo.userId, placeId],
      });
      const prev = queryClient.getQueryData([
        'bookmark',
        userInfo.userId,
        placeId,
      ]);
      const updateBookmark = [{ user_id: userInfo.userId, place_id: placeId }];
      queryClient.setQueryData(
        ['bookmark', userInfo.userId, placeId],
        updateBookmark,
      );
      return { prev };
    },
    onError: (error, updateReviewParams, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          ['bookmark', userInfo.userId, placeId],
          context.prev,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookmark', userInfo.userId, placeId],
      });
    },
  });

  const delBookmark = useMutation({
    mutationFn: deleteBookmark,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['bookmark', userInfo.userId, placeId],
      });
      const prev = queryClient.getQueryData([
        'bookmark',
        userInfo.userId,
        placeId,
      ]);
      const updateBookmark = undefined;
      queryClient.setQueryData(
        ['bookmark', userInfo.userId, placeId],
        updateBookmark,
      );
      return { prev };
    },
    onError: (error, updateReviewParams, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          ['bookmark', userInfo.userId, placeId],
          context.prev,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookmark', userInfo.userId, placeId],
      });
    },
  });

  const toggleBookmark = () => {
    if (isBookmarked) {
      setIsBookmarked(false);
      delBookmark.mutate({ userId: userInfo.userId, placeId });
    } else {
      setIsBookmarked(true);
      addBookmark.mutate({ userId: userInfo.userId, placeId });
    }
  };

  const showAlert = () => {
    toast.warn('로그인 후 이용해 주세요', {
      position: 'top-right',
      autoClose: 2000,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <section>
      <div className=' flex justify-between'>
        <div className='flex'>
          <h1 className='text-2xl text-bold mb-[10px] mr-[4px]'>
            {place_name}
          </h1>

          {userInfo.isLoggedIn ? (
            isBookmarked ? (
              <FaBookmark
                className='cursor-pointer'
                size={20}
                onClick={toggleBookmark}
              />
            ) : (
              <FaRegBookmark
                className='cursor-pointer'
                size={20}
                onClick={toggleBookmark}
              />
            )
          ) : (
            <FaRegBookmark
              className='cursor-pointer'
              size={20}
              onClick={showAlert}
            />
          )}
        </div>
        <div>icons</div>
      </div>
      <div className='mb-[10px]'>
        <p>전화 : {tel}</p>
        <p>주소 : {address}</p>
        <p>
          운영시간 : {working_hours === 'null' ? '정보없음' : working_hours}
        </p>
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
