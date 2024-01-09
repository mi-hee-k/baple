import Seo from '@/components/Seo';
import { Button, Input } from '@nextui-org/react';
import { EyeFilledIcon } from '@/components/login/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/login/EyeSlashFilledIcon';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '@/libs/supabase';

const SignupPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

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

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(() => {
      const newConfirmPassword = e.target.value;
      if (!newConfirmPassword)
        setConfirmPasswordError('비밀번호 확인을 입력해주세요.');
      else if (password !== newConfirmPassword)
        setConfirmPasswordError('비밀번호를 잘못 입력하셨습니다.');
      else setConfirmPasswordError('');
      return newConfirmPassword;
    });
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(() => {
      const newNickname = e.target.value;
      if (!newNickname) setNicknameError('닉네임을 입력해주세요.');
      else if (newNickname.length < 2)
        setNicknameError('닉네임은 2자 이상이어야 합니다.');
      else setNicknameError('');
      return newNickname;
    });
  };
  console.log(email, password, confirmPassword, nickname);
  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
          avatar_url: null,
        },
      },
    });
    console.log('data', data);
    if (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Seo title='SignUp' />
      <div className='h-screen flex flex-col justify-center items-center gap-2'>
        <form onSubmit={signUpHandler}>
          <Input
            type='email'
            label='이메일'
            variant='bordered'
            placeholder='이메일 아이디를 입력해주세요'
            onClear={() => setEmail('')}
            className='max-w-xs'
            onChange={onChangeEmail}
            value={email}
          />
          <div className='text-red-500 text-center'>{emailError}</div>
          <Input
            label='비밀번호'
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
          <Input
            label='비밀번호 확인'
            variant='bordered'
            placeholder='비밀번호는 영문, 숫자 포함 최소 8자 이상 입력해주세요'
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
            onChange={onChangeConfirmPassword}
            value={confirmPassword}
          />
          <div className='text-red-500 text-center'>{confirmPasswordError}</div>
          <Input
            type='text'
            label='닉네임'
            variant='bordered'
            placeholder='닉네임을 입력해주세요'
            onClear={() => setNickname('')}
            className='max-w-xs'
            onChange={onChangeNickname}
            value={nickname}
          />
          <div className='text-red-500 text-center'>{nicknameError}</div>
          <Button color='primary' type='submit'>
            회원 가입
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
