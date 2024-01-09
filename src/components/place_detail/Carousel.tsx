import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

interface Slide {
  id: number;
  img: string;
}

const Crousel = ({
  slidesPerView,
  slideHeight,
  slideData,
}: {
  slidesPerView: number;
  slideHeight: string;
  slideData: Slide[];
}) => {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  return (
    <div className='swiper-container'>
      <Swiper
        loop={true} // 슬라이드 루프
        spaceBetween={10} // 슬라이스 사이 간격
        slidesPerView={slidesPerView} // 보여질 슬라이스 수
        navigation={true} // prev, next button
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
        }}
        scrollbar={{ draggable: true }}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`bg-slate-400 h-[${slideHeight}]`}>
              <img
                src={slide.img}
                className='object-cover w-full h-full'
                alt='img'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Crousel;
