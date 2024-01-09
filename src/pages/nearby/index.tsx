import KakaoMap from '@/components/map/KakaoMap';
import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const NearByPage = () => {
  return (
    <div>
      <KakaoMap></KakaoMap>
    </div>
  );
};

export default NearByPage;
