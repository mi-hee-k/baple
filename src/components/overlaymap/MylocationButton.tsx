import React, { useEffect, useMemo } from 'react';
import { useKakaoLoader, useMap } from 'react-kakao-maps-sdk';

interface Maplocation {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: string | null;
  isLoading: boolean;
}

const MylocationButton = ({ mylocation }: { mylocation: Maplocation }) => {
  const map = useMap();

  const location = new kakao.maps.LatLng(
    mylocation.center.lat,
    mylocation.center.lng,
  );

  return (
    <div className='absolute flex bg-red-500 z-10 top-1 right-[130px] w-[90px] h-[35px] justify-center'>
      <button
        onClick={() => {
          map.setCenter(location);
        }}
      >
        나의 위치
      </button>
    </div>
  );
};

export default MylocationButton;
