import React, { ReactNode } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col justify-between h-[100vh]'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
