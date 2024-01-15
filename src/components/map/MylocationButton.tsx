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

const MylocationButton = ({
  mylocation,
  setLocation,
}: {
  mylocation: Maplocation;
  setLocation: React.Dispatch<React.SetStateAction<Maplocation>>;
}) => {
  const map = useMap();

  const location = new kakao.maps.LatLng(
    mylocation.center.lat,
    mylocation.center.lng,
  );

  return (
    <div className='absolute flex bg-red-500 z-10 top-[3px] left-[130px] w-[90px] h-[35px] justify-center'>
      <button
        onClick={() => {
          map.setCenter(location);
          setLocation({
            center: {
              lat: mylocation.center.lat,
              lng: mylocation.center.lng,
            },
            errMsg: null,
            isLoading: true,
          });
        }}
      >
        나의 위치
      </button>
    </div>
  );
};

export default MylocationButton;
