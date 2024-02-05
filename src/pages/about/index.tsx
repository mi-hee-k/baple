import React from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import person from '../../../public/images/aboutPage/Group 1181.png';
import mainLogo from '../../../public/images/aboutPage/about_LOGO.png';
import Carousel from '@/components/common/Carousel';
import YoutubeCard from '@/components/about/YoutubeCard';

const AboutPage = () => {
  const carouselData = [
    '/images/aboutPage/Carousel1.png',
    '/images/aboutPage/Carousel2.png',
    '/images/aboutPage/Carousel3.png',
    '/images/aboutPage/Carousel4.png',
    '/images/aboutPage/Carousel5.png',
  ];

  return (
    <div className='w-full flex flex-col justify-center items-center overflow-hidden'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 2 }}
        className='sm:h-[60rem] h-auto w-full items-center flex-col flex'
      >
        <Image
          src={mainLogo}
          alt='이미지'
          className='relative sm:h-[162px] sm:w-[400px] h-[80px] w-[200px] z-10 mt-[100px]'
        />
        <p className='sm:mt-[200px] mt-[100px] text-[30px] font-extrabold'>
          Team Mission
        </p>
        <p className='w-[80%] sm:w-[60%] text-center mt-[80px] text-[18px] mb-[100px]  sm:text-[20px] break-words'>
          Baple은 Barrier Free와 Best Place를 결합해, 교통 약자들을 위한 배리어
          프리 정보를 소개하는 플랫폼입니다. 우리의 목표는 모든 사람이 쉽게
          이용할 수 있는 장소를 찾고 공유하며 더 나은 환경을 만들어가는
          것입니다.
        </p>
      </motion.div>

      <div className='w-full sm:h-[60rem]   h-auto flex flex-col  items-center bg-[#EFEAFF]'>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className='w-full flex flex-col justify-center items-center  '
        >
          <YoutubeCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: '200px' }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className='w-[90%] sm:w-[50%]  '
        >
          <p className='font-extrabold text-[30px] mt-[50px] sm:mb-[10px] '>
            Barrier free?
          </p>
          <p className='text-[20px]  mb-[150px]'>
            배리어프리는 장벽을 뜻하는 배리어(Barrier)와 자유를 의미하는
            프리(Free) 의 합성어로, 장애인과 노약자 등 다양한 사회적 약자들이
            살기 좋은 사회를 만들기 위해 물리적, 제도적, 심리적 장벽을
            허물고자하는 노력입니다.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ x: '-200px', opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ ease: 'easeInOut', duration: 1 }}
        className='sm:w-[50%] sm:h-[60rem] md:w-[80%] md:h-full w-full h-full pt-[10%]'
        id='about'
      >
        <Carousel
          slidesPerView={1}
          slideHeight='full'
          slideData={carouselData}
        />
      </motion.div>

      <div className='w-full h-[60rem] flex bg-no-repeat relative   justify-center    '>
        <Image
          src={'/images/aboutPage/LastSection.png'}
          alt='이미지'
          fill={true}
        />
        {/* <motion.div
            initial={{ opacity: 0, y: '-300px' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className='absolute top-[8%] right-[25%]'
          >
            <Image src={macbook} alt='이미지' className='relative z-1' />
          </motion.div> */}
        {/* <motion.div
            initial={{ opacity: 0, x: '-1000px' }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className='absolute top-[45%] left-0 bg-black w-full h-[100%]'
          >
            <Image src={iphone} alt='이미지' className='relative z-10 left-0' />
          </motion.div> */}
        <motion.div
          initial={{ opacity: 0, x: '100px' }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className='absolute top-[30%] right-[15%]'
        >
          {/* <div className='ml-[10rem] relative top-[-50px]'>
            <p className='flex text-[30px] font-extrabold'>
              Barrier Free Place is &nbsp;
              <span className='text-primary'>Best Place</span>
            </p>
            <p className='font-bold'>당신을 위한 최고의 장소를 찾아보세요!</p>
          </div> */}

          <Image src={person} alt='이미지' className='relative z-10' />
        </motion.div>
        {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className='absolute bottom-[10%] flex flex-col justify-center items-center left-[40%]'
          >
            <p className='text-[20px] font-extrabold'>
              Baple은 PC에서도, 모바일 환경에서도 어디서나 함께합니다
            </p>
            <Button className='bg-primary mt-8 w-[20rem] rounded-xl font-bold text-[#fff]'>
              Baple 시작하기
            </Button>
          </motion.div> */}
      </div>
    </div>
  );
};

export default AboutPage;
