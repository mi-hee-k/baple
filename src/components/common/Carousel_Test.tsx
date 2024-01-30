import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface Props {
  imgList: string[];
}

const firstSettings = {
  speed: 500,
  adaptiveHeight: true,
  dotsClass: 'slick-dots slick-thumb',
  nextArrow: (
    <Image
      src={'/images/icons/button/next.svg'}
      alt='button img'
      width={50}
      height={50}
    />
  ),
  prevArrow: (
    <Image
      src={'/images/icons/button/prev.svg'}
      alt='button img'
      width={50}
      height={50}
    />
  ),
};

const secondSettings = {
  speed: 500,
  adaptiveHeight: true,
  dotsClass: 'slick-dots slick-thumb',
  slidesToShow: 5,
  slidesToScroll: 5,
  nextArrow: (
    <Image
      src={'/images/icons/button/next.svg'}
      alt='button img'
      width={50}
      height={50}
    />
  ),
  prevArrow: (
    <Image
      src={'/images/icons/button/prev.svg'}
      alt='button img'
      width={50}
      height={50}
    />
  ),
};

const Carousel_Test = ({ imgList }: Props) => {
  return (
    <div className='page-carousel w-full md:w-[40%] mr-[20px]' id='test'>
      <Slider {...firstSettings}>
        {imgList.length !== 0 &&
          imgList.map((img) => {
            return (
              <div key={img} className='h-[350px] sm:h-[400px]'>
                <Image
                  src={img}
                  alt='img'
                  width={510}
                  height={300}
                  className='object-fill w-full h-full'
                />
              </div>
            );
          })}
      </Slider>
      <Slider {...secondSettings}>
        {imgList.length !== 0 &&
          imgList.map((img) => {
            return (
              <div key={img} className='w-[20%] h-[100px]'>
                <Image
                  src={img}
                  alt='img'
                  width={510}
                  height={300}
                  className='object-fill w-full h-full'
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Carousel_Test;
