import { Button, Input } from '@nextui-org/react';
import { EyeFilledIcon } from '@/components/login/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/login/EyeSlashFilledIcon';
import React, { useState } from 'react';
import Seo from '@/components/Seo';

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => {
      const newEmail = e.target.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!newEmail) setEmailError('이메일 아이디를 입력해주세요.');
      else if (!emailRegex.test(newEmail))
        setEmailError('올바른 이메일 형식이 아닙니다.');
      else setEmailError('');
      return newEmail;
    });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => {
      const newPassword = e.target.value;
      if (!newPassword) setPasswordError('비밀번호를 입력해주세요.');
      else setPasswordError('');
      return newPassword;
    });
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Seo title='Login' />
      <div className='h-screen flex flex-col justify-center items-center gap-2'>
        <form>
          <Input
            isClearable
            type='email'
            label='Email'
            variant='bordered'
            placeholder='이메일 아이디를 입력해주세요'
            onClear={() => setEmail('')}
            className='max-w-xs'
            onChange={onChangeEmail}
            value={email}
          />
          <div className='text-red-500 text-center'>{emailError}</div>
          <Input
            label='Password'
            variant='bordered'
            placeholder='비밀번호를 입력해주세요'
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
            onChange={onChangePassword}
            value={password}
          />
          <div className='text-red-500 text-center'>{passwordError}</div>
          <Button color='primary'>Login</Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
