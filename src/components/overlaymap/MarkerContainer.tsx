import { Tables } from '@/types/supabase';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, MapMarker, useMap } from 'react-kakao-maps-sdk';

const EventMarkerContainer = ({ item }: { item: Tables<'places'> }) => {
  const map = useMap();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (isVisible && !overlayRef.current?.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isVisible]);

  return (
    <>
      <MapMarker
        position={{ lat: item.lat, lng: item.lng }} // 마커를 표시할 위치
        onClick={(marker) => {
          map.panTo(marker.getPosition());
          setIsVisible(true);
        }}
      />
      {isVisible && (
        <Link href={`/place/${item.id}`}>
          <CustomOverlayMap
            position={{ lat: item.lat, lng: item.lng }}
            key={item.id}
            yAnchor={2}
          >
            <div className='bg-white' ref={overlayRef}>
              <div
                className='close w-4 h-4 bg-black text-white text-xs flex items-center justify-center'
                onClick={() => setIsVisible(false)}
                title='닫기'
              >
                X
              </div>
              <div className='info'>
                <div className='title'>{item.place_name}</div>
                <div className='body'>
                  <div className='desc'>
                    <div className='jibun ellipsis'>{item.address}</div>
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        </Link>
      )}
    </>
  );
};

export default EventMarkerContainer;
