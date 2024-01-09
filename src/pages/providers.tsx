import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import store from '@/redux/config/configStore';
import { Provider } from 'react-redux';

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
        </Provider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
