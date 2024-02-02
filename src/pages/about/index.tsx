import MainWrapper from '@/components/layout/MainWrapper';
import React, { useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { motion, useScroll } from 'framer-motion';

const AboutPage = () => {
  const scrollRef = useRef(null);
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '400',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const { scrollYProgress } = useScroll();
  return (
    <MainWrapper>
      <div className='flex flex-col justify-center items-center'>
        <motion.div
          className='w-full bg-black h-[300px]'
          initial={{ translateX: '1000px', opacity: 0 }}
          animate={{ translateX: '0px', opacity: 1 }}
          transition={{ duration: 0.9 }}
        ></motion.div>
        <motion.div
          initial={{ translateX: '-1000px', opacity: 0 }}
          animate={{ translateX: '0px', opacity: 1 }}
          transition={{ duration: 0.9 }}
          style={{ scaleX: scrollYProgress }}
        >
          <div
            ref={scrollRef}
            className='flex bg-slate-400 items-center justify-center flex-col  mt-[250px] w-full'
          >
            <p className='text-[30px]  font-bold'>Team Mission</p>
            <p className='text-[20px] w-[50%] mt-[50px]'>
              Baple은 Barrier Free와 Best Place를 결합해, 교통 약자들을 위한
              배리어 프리 서비스(장소)를 소개하는 플랫폼입니다. 우리의 목표는
              모든 사람이 쉽게 이용할 수 있는 장소를 찾고 공유하며 더 나은
              환경을 만들어가는 것입니다.
            </p>
          </div>
        </motion.div>
        <div className='flex flex-row '>
          {/* <YouTube
            className='mt-[100px] mr-11'
            videoId='2g811Eo7K8U'
            opts={opts}
            onReady={onPlayerReady}
          />
          <YouTube
            className='mt-[100px] mr-11'
            videoId='2g811Eo7K8U'
            opts={opts}
            onReady={onPlayerReady}
          />
          <YouTube
            className='mt-[100px]'
            videoId='2g811Eo7K8U'
            opts={opts}
            onReady={onPlayerReady}
          /> */}
        </div>
        <motion.div
          initial={{ translateX: '-1000px', opacity: 0 }}
          animate={{ translateX: '0px', opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ root: scrollRef }}
        >
          <div
            ref={scrollRef}
            className='text-[30px] mt-[300px] font-bold  bg-slate-400'
          >
            <p className='text-[30px] mt-[100px] font-bold flex justify-center bg-slate-400'>
              장소 찾기와 공유하기
            </p>
            <div className='flex flex-row mt-[100px] w-full justify-center'>
              <div className='w-[30rem] h-[40rem] bg-black mr-[10rem]'></div>
              <div className='w-[30rem] h-[40rem] bg-black'></div>
            </div>
          </div>
        </motion.div>
        <p className='text-[30px] mt-[100px]  font-bold'>
          원하는 편의 시설로 검색하기
        </p>
        <div className='w-full h-[30rem] bg-black'></div>
        <p className='text-[30px] mt-[100px]  font-bold'>리뷰 남기기</p>
        <div className='w-full h-[30rem] bg-black mt-10'></div>
        <div className='w-full h-[30rem] bg-black mt-10'></div>
        <p className='text-[30px] mt-[100px]  font-bold'>지금 시작하기</p>
        <div className='w-full h-[30rem] bg-black mt-10'></div>
      </div>
    </MainWrapper>
  );
};

export default AboutPage;
