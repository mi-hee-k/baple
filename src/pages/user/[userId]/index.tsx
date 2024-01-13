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
import { toast } from 'react-toastify';
import { MdPhotoCameraBack } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';

const UserPage = () => {
  const router = useRouter();
  const { username, avatarUrl } = useSelector((state: RootState) => state.auth);
  const [userId, setUserId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  // const { userId } = router.query as { userId: string };
  const [imagePreview, setImagePreview] = useState(avatarUrl);

  useEffect(() => {
    if (!router.isReady) return;
    const { userId } = router.query;
    if (typeof userId === 'string') {
      setUserId(userId);
    }
  }, [router.isReady, router.query]);

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
    mutationFn: updateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'user',
        userId,
      ] as InvalidateQueryFilters);
      // await refetch();
    },
  });

  const onEditDone = async () => {
    // avatar 수정이 있을 때
    if (newAvatar) {
      // storage 업로드
      const { data: fileData, error: fileError } = await supabase.storage
        .from('avatars')
        .upload(`${Date.now()}`, newAvatar);
      if (fileError) {
        console.error('이미지 업로드 에러', fileError.message);
        return;
      }
      const { data: imageData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileData.path);

      const newAvatarUrl = imageData.publicUrl;
      mutate({ userId, newUsername, newAvatarUrl });
      setIsEditing(false);
    } else {
      // 닉네임만 수정할 때
      mutate({ userId, newUsername });
      setIsEditing(false);
    }
  };

  const previewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 1024 * 1024) {
        return toast.warn('최대 1MB까지 업로드 가능합니다.');
      }
      const imgUrl = URL.createObjectURL(selectedFile);
      setNewAvatar(selectedFile);
      setImagePreview(imgUrl);
    }
  };

  console.log('imagePreview', imagePreview);
  console.log('newAvatar', newAvatar);
  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  return (
    <>
      <Seo title={`${user?.user_name}님의 페이지`} />
      <div className='flex justify-center'>
        <Card className='w-[400px]'>
          <CardBody className='flex gap-6 items-center'>
            {isEditing ? (
              <label className='relative'>
                <Avatar showFallback src={imagePreview} className='w-36 h-36' />
                <div className='absolute top-0 w-full h-full flex flex-col justify-center items-center text-white transition-opacity cursor-pointer  rounded-full backdrop-blur-sm backdrop-brightness-50 opacity-0 hover:opacity-100'>
                  <MdPhotoCameraBack className='text-[4rem] mx-auto ' />
                  <p className='font-bold'>이미지 변경</p>
                </div>
                <input
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                  onChange={previewImg}
                />
              </label>
            ) : (
              <Avatar
                showFallback
                src={user?.avatar_url}
                className='w-24 h-24'
              />
            )}
            <div className='flex flex-col gap-6'>
              <div className='flex gap-3'>
                <label className='w-16'>닉네임</label>
                {isEditing ? (
                  <Input
                    defaultValue={user?.user_name}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                ) : (
                  <span className='text-md'>{user?.user_name}</span>
                )}
              </div>
              <div className='flex gap-3'>
                <label className='w-16'>이메일</label>
                <span className='text-small text-default-500'>
                  {user?.email}
                </span>
              </div>
              {isEditing ? (
                <div className='flex gap-4'>
                  <Button onClick={onEditDone}>수정완료</Button>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      // setImagePreview('');
                    }}
                  >
                    취소
                  </Button>
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
