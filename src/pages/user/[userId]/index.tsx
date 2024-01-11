import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import type { User } from '@/types/types';
import { getUserDataById } from '@/apis/users';

interface UserProfileProps {
  userData: User;
}

type Props = {
  userId: string;
  userData: string[];
};

const UserPage = ({ userId, userData }: Props) => {
  const router = useRouter();
  console.log('router', router);
  useEffect(() => {
    if (!router.isReady) return;
    const { userId } = router.query;
    console.log(userId);
  }, [router.isReady, router.query]);

  return <div>UserPage</div>;
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
