import { supabase } from '@/libs/supabase';
import { logInUser, logOutUser, updateUser } from '@/redux/modules/authSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { RootState } from '@/redux/config/configStore';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getUserDataById } from '@/apis/users';
import Image from 'next/image';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log('router', router);
  const [currentUser, setCurrentUser] = useState<any>(null);
  // const [userId, setUserId] = useState('');
  const { userId } = useSelector((state: RootState) => state.auth);

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserDataById(userId),
    enabled: !!userId,
  });
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user.id as string;
      const email = session?.user.email;
      const avatarUrl = session?.user.user_metadata.avatar_url;
      const username = session?.user.user_metadata.user_name;
      // setUserId(userId);
      console.log(event, session);
      if (event === 'INITIAL_SESSION' && session !== null) {
        setCurrentUser(session?.user);
        dispatch(
          logInUser({
            userId,
            email,
            avatarUrl: user?.avatar_url,
            username: user?.user_name,
          }),
        );
        // setusername(username);
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
        setCurrentUser(session?.user);
        dispatch(
          logInUser({
            userId,
            email,
            avatarUrl: user?.avatar_url,
            username: user?.user_name,
          }),
        );
      } else if (event === 'SIGNED_OUT') {
        dispatch(logOutUser());
        setCurrentUser(null);
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
        dispatch(
          updateUser({
            avatarUrl: user?.avatar_url,
            username: user?.user_name,
          }),
        );
        setCurrentUser(session?.user);
        // setusername(username);
      }
    });
  }, [dispatch, user]);

  const logOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push('/');
  };

  return (
    <header className='py-2 font-bold sticky top-0 z-10 shadow-xl bg-white'>
      <div className='container m-auto flex items-center max-w-[1200px] min-h-[48px] w-[90%]'>
        <nav className='flex w-full justify-between items-center'>
          <div className='flex gap-10'>
            <Link href='/'>
              <Image
                src='/images/icons/basic-logo.svg'
                alt='main logo'
                width={100}
                height={50}
              />
            </Link>
            <div className='flex gap-4 items-center'>
              <Link
                href='/nearby'
                className={` ${
                  router.pathname === '/nearby'
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
              >
                주변 장소
              </Link>
              <Link
                href='/places'
                className={` ${
                  router.pathname === '/places'
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
              >
                장소 검색
              </Link>
              <Link
                href='/board'
                className={` ${
                  router.pathname === '/board'
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
              >
                게시판
              </Link>
            </div>
          </div>
          {currentUser ? (
            <div className='flex gap-4 items-center'>
              <span>반가워요 {user?.user_name}님!</span>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    showFallback
                    src={user?.avatar_url}
                    className='hover:brightness-50 transition cursor-pointer'
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem key='mypage' href={`/user/${currentUser.id}`}>
                    마이페이지
                  </DropdownItem>
                  <DropdownItem key='logout' onClick={logOutHandler}>
                    로그아웃
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className='flex gap-4'>
              <Link href='/login'>
                <Button variant='solid' color='primary'>
                  로그인
                </Button>
              </Link>
              <Link href='/signup'>
                <Button variant='bordered' color='primary'>
                  회원가입
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
