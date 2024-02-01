import MainWrapper from '@/components/layout/MainWrapper';
import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const AboutPage = () => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <MainWrapper>
      <div className='flex flex-col justify-center items-center'>
        <section className='w-full bg-black h-[300px] '></section>
        <section className='flex items-center justify-center flex-col w-[50%] mt-[100px]'>
          <p className='text-[30px]'>Team Mission</p>
          <p className='text-[20px]'>
            Baple은 Barrier Free와 Best Place를 결합해, 교통 약자들을 위한
            배리어 프리 서비스(장소)를 소개하는 플랫폼입니다. 우리의 목표는 모든
            사람이 쉽게 이용할 수 있는 장소를 찾고 공유하며 더 나은 환경을
            만들어가는 것입니다.
          </p>
        </section>
        <YouTube
          className='mt-[100px]'
          videoId='2g811Eo7K8U'
          opts={opts}
          onReady={onPlayerReady}
        />
        <p className='text-[30px] mt-[100px]'>장소 찾기와 공유하기</p>
        <div className='flex flex-row mt-[100px] w-full justify-center'>
          <div className='w-[30rem] h-[40rem] bg-black mr-[10rem]'></div>
          <div className='w-[30rem] h-[40rem] bg-black'></div>
        </div>
        <p className='text-[30px] mt-[100px]'>원하는 편의 시설로 검색하기</p>
      </div>
    </MainWrapper>
  );
};

export default AboutPage;
