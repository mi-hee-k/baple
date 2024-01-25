import { shareKakao } from '@/utils/shareKaKao';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { PlaceInfoAllData } from './PlaceDetail';

const PlaceDetailHeader = ({
  placeId,
  placeInfo,
  isLoggedIn,
  isBookmarked,
  toggleBookmark,
  showAlert,
}: PlaceInfoAllData) => {
  return (
    <>
      <h1 className='text-2xl font-bold sm:text-3xl mt-[10px] mb-[10px] sm:mb-[30px] '>
        {placeInfo.place_name}
      </h1>
      <div className='flex'>
        {isLoggedIn ? (
          isBookmarked ? (
            <>
              {/* <Image
                    src='/images/icons/bookmark.svg'
                    alt='bookmark'
                    width={34}
                    height={34}
                    className='cursor-pointer mr-[10px]'
                    onClick={toggleBookmark}
                  /> */}
              <FaBookmark
                className='cursor-pointer mr-[10px]'
                size='34px'
                onClick={toggleBookmark}
              />
              <RiKakaoTalkFill
                className='cursor-pointer '
                size='34px'
                onClick={() =>
                  shareKakao({
                    address: placeInfo?.address,
                    place_name: placeInfo?.place_name,
                    placeId,
                  })
                }
              />
            </>
          ) : (
            <>
              {/* <Image
                    src='/images/icons/bookmark.svg'
                    alt='bookmark'
                    width={34}
                    height={34}
                    className='cursor-pointer mr-[10px]'
                    onClick={toggleBookmark}
                  /> */}
              <FaRegBookmark
                className='cursor-pointer mr-[10px]'
                size='34px'
                onClick={toggleBookmark}
              />
              <RiKakaoTalkFill
                className='cursor-pointer '
                size='34px'
                onClick={() =>
                  shareKakao({
                    address: placeInfo?.address,
                    place_name: placeInfo?.place_name,
                    placeId,
                  })
                }
              />
            </>
          )
        ) : (
          <>
            {/* <Image
                  src='/images/icons/bookmark.svg'
                  alt='bookmark'
                  width={34}
                  height={34}
                  className='cursor-pointer'
                  onClick={showAlert}
                /> */}
            <FaRegBookmark
              className='cursor-pointer'
              size='34px'
              onClick={showAlert}
            />
            <RiKakaoTalkFill
              className='cursor-pointer '
              size='34px'
              onClick={() =>
                shareKakao({
                  address: placeInfo?.address,
                  place_name: placeInfo?.place_name,
                  placeId,
                })
              }
            />
          </>
        )}
      </div>
    </>
  );
};

export default PlaceDetailHeader;
