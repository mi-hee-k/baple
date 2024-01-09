import { Input } from '@nextui-org/react';
import { EyeFilledIcon } from '@/components/login/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/login/EyeSlashFilledIcon';
import React from 'react';
import Seo from '@/components/Seo';

const LoginPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <Seo title='Login' />
      <div className=' h-screen flex flex-col justify-center items-center '>
        <Input
          isClearable
          type='email'
          label='Email'
          variant='bordered'
          placeholder='Enter your email'
          onClear={() => console.log('input cleared')}
          className='max-w-xs'
        />
        <Input
          label='Password'
          variant='bordered'
          placeholder='Enter your password'
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          className='max-w-xs'
        />
      </div>
    </>
  );
};

export default LoginPage;
