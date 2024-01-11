import { supabase } from '@/libs/supabase';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface Maplocation {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: string | null;
  isLoading: boolean;
}

interface Place {
  id: string;
  lat: number;
  lng: number;
  place_name: string;
}

// TODO: 고민 포인트
// 1. zoom level에 따라 radius 를 설정 가능한지
// 2. radius 에 맞는 지도 사이즈가 나오는지
// 3. 지도 사이즈에 맞는 데이터를 가져올 수 있는가?

const NearByPage = () => {
  const [location, setLocation] = useState<Maplocation>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [mylocation, setMyLocation] = useState<Maplocation>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [regionName, setRegionName] = useState<string>('');
  const [place, setplace] = useState<Place[] | null>([]);

  /**
   * 현재 할것
   * 1. 현재 위경도 값을 동적으로 변환 시키기 위해 sdk제공 코드 사용
   * 2.
   */

  // 함수로 만들어 useEffect에서 실행
  // 해당 함수는 place에 대한 위경도값을 주소로 변환 후 구 정보를 뽑아오는 코드
  const fetchMap = async () => {
    try {
      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location.center.lng}&y=${location.center.lat}&input_coord=WGS84`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
            },
          },
        )
        .then((res) => {
          setRegionName(res.data.documents[0]?.address.region_2depth_name);
          console.log(res.data.documents[0]?.address);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaceData = async () => {
    let { data: places, error } = await supabase
      .from('places')
      .select('*')
      .eq('district', regionName);
    // 남쪽위도
    if (places !== null) {
      setplace(places);
      console.log('데이터가 fecthing 되었습니다');
    }
    if (error) console.log('error');
  };

  useEffect(() => {
    // 초기값과 같지 않다면 실행
    if (
      location.center.lng !== 126.570667 &&
      location.center.lat !== 33.450701
    ) {
      fetchMap();
    }
  }, [location]);

  useEffect(() => {
    fetchPlaceData();
  }, [regionName]);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
          setMyLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        (err) => {
          setLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setLocation((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  /**
   * 1.
   */
  return (
    <>
      <Map // 지도를 표시할 Container
        center={location.center}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={4} // 지도의 확대 레벨
        onDrag={(map) =>
          setLocation({
            center: {
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            },
            errMsg: null,
            isLoading: false,
          })
        }
      >
        {!location.isLoading && (
          <MapMarker position={mylocation.center}>
            <div style={{ padding: '5px', color: '#000' }}>
              {location.errMsg ? location.errMsg : '현재위치'}
            </div>
          </MapMarker>
        )}
        {place?.map((item) => (
          <MapMarker
            key={item.id}
            position={{ lat: item.lat, lng: item.lng }} // 마커를 표시할 위치
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35,
              }, // 마커이미지의 크기입니다
            }}
            title={item.place_name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          />
        ))}
      </Map>
    </>
  );
};

export default NearByPage;
