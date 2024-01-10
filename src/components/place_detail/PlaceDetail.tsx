import React from 'react';

interface PlaceInfoData {
  place_name: string;
  tel: string;
  address: string;
  working_hours: string;
  holidays: string;
  is_audio_guide: boolean;
  is_braille_guide: boolean;
  is_disabled_parking: boolean;
  is_disabled_toilet: boolean;
  is_easy_door: boolean;
  is_guide_dog: boolean;
  is_paid: boolean;
  is_wheelchair_rental: boolean;
}

interface PlaceDetailProps {
  placeInfo: PlaceInfoData;
}

const PlaceDetail = ({ placeInfo }: PlaceDetailProps) => {
  const { place_name, tel, address, working_hours, holidays } =
    placeInfo as PlaceInfoData;

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

  return (
    <section>
      <div className=' flex justify-between'>
        <h1 className='text-2xl text-bold mb-[10px] '>{place_name} 🏷</h1>
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
