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
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
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
