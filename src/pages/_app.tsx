import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Providers from './providers';
import { useRouter } from 'next/router';
import { Noto_Sans_KR } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

const notoSansKr = Noto_Sans_KR({
  weight: ['500', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === '/login' || router.pathname === '/signup') {
    return (
      <main className={notoSansKr.className}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </main>
    );
  }
  return (
    <main className={notoSansKr.className}>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </main>
  );
}
