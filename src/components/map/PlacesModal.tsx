import { RootState } from '@/redux/config/configStore';
import React from 'react';
import { useSelector } from 'react-redux';
import MapPlaceCard from './MapPlaceCard';

const PlacesModal = () => {
  const places = useSelector((state: RootState) => state.placesDataSlice);
  console.log(places);
  return (
    <div className='absolute flex flex-col bg-red-500 right-0 z-10 w-[300px] h-[93vh]'>
      {/* 맵으로 장소카드 컴포넌트 만들어 뿌려주기 */}
      {places?.map((place) => {
        return <MapPlaceCard place={place} key={place.id} />;
      })}
    </div>
  );
};

export default PlacesModal;
