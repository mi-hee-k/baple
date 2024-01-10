import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import store from '@/redux/config/configStore';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <NextUIProvider>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          {/* </PersistGate> */}
          <ToastContainer />
        </Provider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
