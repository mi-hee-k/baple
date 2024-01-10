import { supabase } from '@/libs/supabase';
import { loginUser } from '@/redux/modules/authSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

const Header = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userId, setUserId] = useState('');

  // useEffect(() => {
  //   // 브라우저 환경에서만 localStorage 사용
  //   if (typeof window !== 'undefined') {
  //     const session = JSON.parse(
  //       localStorage.getItem('sb-viqpcjrcqjtetxqetmpo-auth-token') as string,
  //     );
  //     console.log('localStorage', session as string);
  //     if (session) {
  //     }
  //   }
  // }, []);

  // const [isAuth, setIsAuth] = useState(!!auth.currentUser);
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      const userId = session?.user.id;
      const email = session?.user.email;
      const avatarUrl = session?.user.user_metadata.avatar_url;
      const nickname = session?.user.user_metadata.nickname;
      setNickname(nickname);

      if (event === 'INITIAL_SESSION') {
        setCurrentUser(session?.user);
        // dispatch(loginUser({ userId, email, avatarUrl, nickname }));
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
        setCurrentUser(session?.user);
        dispatch(loginUser({ userId, email, avatarUrl, nickname }));
        // dispatch(loginUser({ userInfo: session?.user }));
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
        setCurrentUser(null);
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    });
  }, [dispatch]);

  const logOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <header className='bg-yellow-300 py-2 font-bold mb-8 sticky top-0 z-20 shadow-md'>
      <div className='container m-auto flex flex-row items-center max-w-[1200px] min-h-[48px] w-[90%]'>
        <nav className='flex flex-row gap-6'>
          <Link href='/'>BAPLE</Link>
          <Link href='/nearby'>주변 장소</Link>
          <Link href='/places'>장소 목록</Link>
          <Link href='/place/1234'>장소 상세</Link>
          <Link href='/review/1234'>리뷰 상세</Link>
          <Link href='/review/write'>리뷰 작성</Link>
          {currentUser ? (
            <>
              <span>반가워요 {nickname}님!</span>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    src='/images/avatar_default.jpg'
                    className='hover:brightness-50 transition'
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem key='mypage' href='/user/1234'>
                    마이페이지
                  </DropdownItem>
                  <DropdownItem key='logout' onClick={logOutHandler}>
                    로그아웃
                  </DropdownItem>
                  <DropdownItem
                    key='delete'
                    className='text-danger'
                    color='danger'
                  >
                    Delete file
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <>
              <Link href='/login'>로그인</Link>
              <Link href='/signup'>회원가입</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
