import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Providers from './providers';
import { useRouter } from 'next/router';
import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}

const kakaoInit = () => {
  // 페이지가 로드시 실행
  if (!window.Kakao.isInitialized())
    // 선언되지 않았을 때만 실행하도록 if문 추가
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_KEY);
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === '/login' || router.pathname === '/signup') {
    return (
      <Providers>
        <Component {...pageProps} />
        <Script
          src='https://developers.kakao.com/sdk/js/kakao.js'
          onLoad={kakaoInit}
        />
      </Providers>
    );
  }
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
        <Script
          src='https://developers.kakao.com/sdk/js/kakao.js'
          onLoad={kakaoInit}
        />
      </Layout>
    </Providers>
  );
}
