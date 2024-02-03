import MainWrapper from '@/components/layout/MainWrapper';
import React, { useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import person from '../../../public/images/aboutPage/Group 1181.png';
import macbook from '../../../public/images/aboutPage/MacBook Pro 23.png';
import iphone from '../../../public/images/aboutPage/iPhone 15.png';
import mainLogo from '../../../public/images/aboutPage/about_LOGO.png';
import Carousel from '@/components/common/Carousel';
import { Button, Spacer } from '@nextui-org/react';

const AboutPage = () => {
  // const onPlayerReady: YouTubeProps['onReady'] = (event) => {
  //   event.target.pauseVideo();
  // };

  // const videoid = ['2g811Eo7K8U', 'dietV6QhYek', '2g811Eo7K8U'];

  // const opts: YouTubeProps['opts'] = {
  //   height: '390',
  //   width: '400',
  //   playerVars: {
  //     autoplay: 1,
  //     rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
  //     modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
  //   },
  // };

  const carouselData = [
    '/images/aboutPage/Carousel1.png',
    '/images/aboutPage/Carousel2.png',
    '/images/aboutPage/Carousel3.png',
    '/images/aboutPage/Carousel4.png',
    '/images/aboutPage/Carousel5.png',
  ];

  return (
    <div className='flex flex-col justify-center items-center overflow-hidden'>
      {/* <motion.div
        className='w-full bg-black h-[300px]'
        initial={{ x: '-300px', opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ ease: 'easeInOut', duration: 1 }}
      ></motion.div>
      <motion.div
        initial={{ x: '300px', opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ ease: 'easeInOut', duration: 1 }}
        className='flex bg-slate-400 items-center justify-center flex-col  mt-[250px] w-full'
      >
        <p className='text-[30px]  font-bold'>Team Mission</p>
        <p className='text-[20px] w-[50%] mt-[50px]'>
          Baple은 Barrier Free와 Best Place를 결합해, 교통 약자들을 위한 배리어
          프리 서비스(장소)를 소개하는 플랫폼입니다. 우리의 목표는 모든 사람이
          쉽게 이용할 수 있는 장소를 찾고 공유하며 더 나은 환경을 만들어가는
          것입니다.
        </p>
      </motion.div>
      <motion.div
        className='flex flex-row mt-[200px]'
        initial={{ x: '-300px', opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ ease: 'easeInOut', duration: 1 }}
      >
        {videoid.map((item) => {
            return (
              <YouTube
                className='mt-[100px] mr-11'
                videoId={item}
                opts={opts}
                onReady={onPlayerReady}
                key={item.length}
              />
            );
          })}
        <YouTube
          className='mt-[100px] mr-11'
          videoId='2g811Eo7K8U'
          opts={opts}
          onReady={onPlayerReady}
        />
        
      </motion.div>
        */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className='h-[60rem] w-full justify-center flex'
      >
        <Image
          src={mainLogo}
          alt='이미지'
          className='relative h-[162px] z-10 mt-12'
        />
      </motion.div>

      <div className='w-full h-[60rem]  bg-[#EFEAFF]'>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className='w-full flex flex-col justify-center items-center mt-[300px] '
        ></motion.div>
      </div>

      <motion.div
        initial={{ x: '300px', opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ ease: 'easeInOut', duration: 1 }}
        className='w-[50%] h-[60rem] pt-[10%]'
        id='about'
      >
        <Carousel
          slidesPerView={1}
          slideHeight='full'
          slideData={carouselData}
        />
      </motion.div>

      <div className='w-full flex flex-col justify-center items-center  '>
        {/* <p className='text-[30px] mt-[100px]  font-bold'>지금 시작하기</p> */}
        <div className='w-full h-[60rem] flex bg-[red]   relative  items-center justify-center'>
          <div className=' flex w-[50%] h-[60rem]  left-[50%]'>
            <motion.div
              initial={{ opacity: 0, y: '-300px' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1 }}
              className='absolute top-[8%] right-[25%]'
            >
              <Image src={macbook} alt='이미지' className='relative z-1' />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: '-1000px' }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1 }}
              className='absolute top-[45%] left-[20%] bg-black w-[100%] h-[100%]'
            >
              <Image src={iphone} alt='이미지' className='relative z-10' />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: '100px' }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1 }}
              className='absolute top-[30%] right-[5%]'
            >
              <div className='ml-[10rem] relative top-[-50px]'>
                <p className='flex text-[30px] font-extrabold'>
                  Barrier Free Place is &nbsp;
                  <span className='text-primary'>Best Place</span>
                </p>
                <p className='font-bold'>
                  당신을 위한 최고의 장소를 찾아보세요!
                </p>
              </div>

              <Image src={person} alt='이미지' className='relative z-10' />
            </motion.div>
            <motion.div
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
