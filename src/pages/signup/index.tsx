import Seo from '@/components/Seo';
import { Button, Input } from '@nextui-org/react';
import { EyeFilledIcon } from '@/components/login/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/login/EyeSlashFilledIcon';
import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '@/libs/supabase';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const signUpHandler: SubmitHandler<FormValues> = async (formData) => {
    const { email, password, nickname, confirmPassword } = formData;
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
      <div className='h-screen flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit(signUpHandler)}>
          <Input
            type='email'
            label='이메일'
            variant='bordered'
            placeholder='이메일 아이디를 입력해주세요'
            className='max-w-xs'
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 메일 형식이 아닙니다',
              },
            })}
          />
          {errors.email && (
            <p className='text-red-500 text-xs'>{errors.email.message}</p>
          )}
          <Input
            label='비밀번호'
            variant='bordered'
            placeholder='비밀번호를 입력해주세요'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility1}
              >
                {isVisible1 ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isVisible1 ? 'text' : 'password'}
            className='max-w-xs'
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                message: '비밀번호 조건에 맞게 입력해주세요',
              },
            })}
          />
          {errors.password && (
            <p className='text-red-500 text-xs'>{errors.password.message}</p>
          )}
          <Input
            label='비밀번호 확인'
            variant='bordered'
            placeholder='비밀번호는 영문, 숫자 포함 최소 8자 이상 입력해주세요'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility2}
              >
                {isVisible2 ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isVisible2 ? 'text' : 'password'}
            className='max-w-xs'
            {...register('confirmPassword', {
              required: '비밀번호를 입력해주세요',
              validate: (value) => value === passwordRef.current,
            })}
          />
          {errors.confirmPassword && (
            <p className='text-red-500 text-xs'>
              {errors.confirmPassword.message}
            </p>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <p className='text-red-500 text-xs'>
                비밀번호가 일치하지 않습니다
              </p>
            )}
          <Input
            type='text'
            label='닉네임'
            variant='bordered'
            placeholder='닉네임을 입력해주세요'
            className='max-w-xs'
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
              maxLength: {
                value: 20,
                message: '20글자를 초과할 수 없습니다',
              },
            })}
          />
          {errors.nickname && (
            <p className='text-red-500 text-xs'>{errors.nickname.message}</p>
          )}
          <Button color='primary' type='submit'>
            회원 가입
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
