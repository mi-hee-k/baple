import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import type { User } from '@/types/types';
import { getUserDataById, updateUser } from '@/apis/users';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Avatar, Button, Card, CardBody, Input } from '@nextui-org/react';
import Seo from '@/components/layout/Seo';
import { supabase } from '@/libs/supabase';

// interface UserProfileProps {
//   userData: User;
// }

// type Props = {
//   userId: string;
//   userData: string[];
// };

const UserPage = () => {
  const router = useRouter();
  // const [userId, setUserId] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');

  const { userId } = router.query as { userId: string };

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const { userId } = router.query;
  //   if (typeof userId === 'string') {
  //     setUserId(userId);
  //   }
  // }, [router.isReady]);

  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserDataById(userId),
    enabled: userId !== undefined,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => updateUser(userId, newNickname),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'user',
        userId,
      ] as InvalidateQueryFilters);
      await refetch();
      setIsEditing(false);
    },
  });

  const onEditDone = () => {
    mutate();
    // refetch();
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  return (
    <>
      <Seo title={`${user?.nickname}님의 페이지`} />
      <div className='flex justify-center'>
        <Card className='w-[400px]'>
          <CardBody className='flex gap-3 items-center'>
            <Avatar showFallback src={user?.avatar_url} className='w-24 h-24' />
            <div className='flex flex-col'>
              <div className='flex gap-3'>
                <label>닉네임</label>
                {isEditing ? (
                  <Input
                    defaultValue={user?.nickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                  />
                ) : (
                  <span className='text-md'>{user?.nickname}</span>
                )}
              </div>
              <div className='flex gap-3'>
                <label>이메일</label>
                <span className='text-small text-default-500'>
                  {user?.email}
                </span>
              </div>
              {isEditing ? (
                <div className='flex gap-4'>
                  <Button onClick={onEditDone}>수정완료</Button>
                  <Button onClick={() => setIsEditing(false)}>취소</Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  회원정보 수정
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
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
