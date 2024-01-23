import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MainWrapper = ({ children }: Props) => {
  return <div className='max-w-[1275px] m-auto mt-4'>{children}</div>;
};

export default MainWrapper;
