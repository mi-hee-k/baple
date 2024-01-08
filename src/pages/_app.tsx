import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Providers from './providers';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === '/login' || router.pathname === '/signup') {
    return (
      <Providers>
        <Component {...pageProps} />
      </Providers>
    );
  }
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
