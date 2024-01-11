import { deleteBookmark, getBookmark, insertBookmark } from '@/apis/bookmark';
import { RootState } from '@/redux/config/configStore';
import { Tables } from '@/types/supabase';
import { Bookmark, BookmarkSolid } from 'iconoir-react';
import { useSelector } from 'react-redux';

interface PlaceInfoAllData {
  placeId: string;
  placeInfo: Tables<'places'>;
}

const PlaceDetail = ({ placeInfo, placeId }: PlaceInfoAllData) => {
  const userInfo = useSelector((state: RootState) => state.auth);
  console.log(userInfo);
  const { place_name, tel, address, working_hours, holidays } = placeInfo;

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

  const findBookmark = async () => {
    const res = await getBookmark(userInfo.userId);
    res.filter((item) => {
      if (item.place_id === placeId) {
        console.log(item.place_id, '이미 북마크');
      } else {
        return item;
      }
    });
  };

  return (
    <section>
      <div className=' flex justify-between'>
        <div className='flex'>
          <h1 className='text-2xl text-bold mb-[10px] mr-[4px]'>
            {place_name}
          </h1>

          <Bookmark
            className='cursor-pointer'
            onClick={() => insertBookmark(userInfo.userId, placeId)}
          />

          <Bookmark className='cursor-pointer' onClick={findBookmark} />

          <BookmarkSolid
            className='cursor-pointer'
            onClick={() => deleteBookmark(placeId)}
          />
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
