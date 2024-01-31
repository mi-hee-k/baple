import React from 'react';

const AlarmModal = () => {
  return (
    <div className='w-[100%] h-[100%] fixed  z-10 flex justify-center items-center'>
      <div className='z-20 bg-white rounded-md w-[300px] h-[200px] flex flex-col justify-center items-center opacity-100 absolute bg-opacity-100'>
        <p>message</p>
      </div>
      <div className='absolute w-[100%] h-[100%] bg-gray-900 opacity-50'></div>
    </div>
  );
};

export default AlarmModal;
