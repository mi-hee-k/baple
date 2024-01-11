import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import type { User } from '@/types/types';
import { getUserDataById } from '@/apis/users';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, CardBody } from '@nextui-org/react';

interface UserProfileProps {
  userData: User;
}

type Props = {
  userId: string;
  userData: string[];
};

const UserPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  console.log('router', router);
  useEffect(() => {
    if (!router.isReady) return;
    const { userId } = router.query;
    if (typeof userId === 'string') {
      setUserId(userId);
    }
  }, [router.isReady, router.query]);
  console.log(userId);

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserDataById(userId),
  });
  console.log('user', user);
  return (
    <div className='flex justify-center'>
      <Card className='w-[400px]'>
        <CardBody className='flex gap-3 flex-col items-center'>
          {user?.avatar_url === null ? (
            <Avatar
              showFallback
              src='https://images.unsplash.com/broken'
              className='w-24 h-24'
            />
          ) : (
            <Avatar src={user?.avatar_url} className='w-24 h-24' />
          )}
          <div className='flex flex-col'>
            <span className='text-md'>{user?.nickname}</span>
            <span className='text-small text-default-500'>{user?.email}</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const userId = context.params?.userId as string;

//   // 예시: 사용자 데이터를 불러오는 함수
//   const userData = await getUserDataById(userId);

//   return {
//     props: {
//       userId,
//       userData,
//     },
//   };
// };
