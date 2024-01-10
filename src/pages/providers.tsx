import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import store from '@/redux/config/configStore';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  // AS-IS
  // const client = new QueryClient();

  // TO-BE
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            //staletime 지정 안할시 클리이언트사이드에서 즉시 refetching 됨
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Provider store={store}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer />
        </Provider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
