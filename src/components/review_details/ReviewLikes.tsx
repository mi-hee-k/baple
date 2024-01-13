import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FaShareAlt } from 'react-icons/fa';
import { deleteLikes, getLikes, insertLikes } from '@/apis/likes';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface Props {
  reviewId: string;
}

const ReviewLikes = ({ reviewId }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // console.log(router.asPath);

  const userInfo = useSelector((state: RootState) => state.auth);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { data: likeState } = useQuery({
    queryKey: ['likes', userInfo.userId, reviewId],
    queryFn: () => getLikes({ userId: userInfo.userId, reviewId }),
  });

  useEffect(() => {
    setIsLiked(likeState ? likeState.length > 0 : false);
  }, [likeState]);

  // 낙관적 업데이트 (추가)
  const addLikes = useMutation({
    mutationFn: insertLikes,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['likes', userInfo.userId, reviewId],
      });
      const prev = queryClient.getQueryData([
        'likes',
        userInfo.userId,
        reviewId,
      ]);
      const updateBookmark = [
        { user_id: userInfo.userId, review_id: reviewId },
      ];
      queryClient.setQueryData(
        ['likes', userInfo.userId, reviewId],
        updateBookmark,
      );
      return { prev };
    },
    onError: (error, updateReviewParams, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          ['likes', userInfo.userId, reviewId],
          context.prev,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes', userInfo.userId, reviewId],
      });
    },
  });

  // 낙관적 업데이트 (삭제)
  const delLikes = useMutation({
    mutationFn: deleteLikes,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['likes', userInfo.userId, reviewId],
      });
      const prev = queryClient.getQueryData([
        'likes',
        userInfo.userId,
        reviewId,
      ]);
      const updateBookmark = undefined;
      queryClient.setQueryData(
        ['likes', userInfo.userId, reviewId],
        updateBookmark,
      );
      return { prev };
    },
    onError: (error, updateReviewParams, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          ['likes', userInfo.userId, reviewId],
          context.prev,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes', userInfo.userId, reviewId],
      });
    },
  });

  // 버튼 토글
  const toggleLikes = () => {
    if (isLiked) {
      setIsLiked(false);
      delLikes.mutate({ userId: userInfo.userId, reviewId });
    } else {
      setIsLiked(true);
      addLikes.mutate({ userId: userInfo.userId, reviewId });
    }
  };

  // 로그인 안내 모달
  const showLoginAlert = () => {
    toast.warn('로그인 후 이용해주세요', {
      position: 'top-right',
      autoClose: 2000,
      progress: undefined,
      theme: 'light',
    });
  };

  // 클립보드 성공 모달
  const showCopyAlert = () => {
    toast.success('클립보드에 복사 성공', {
      position: 'top-right',
      autoClose: 2000,
      progress: undefined,
      theme: 'light',
    });
  };

  // 클립보드 url 복사
  const copyClipboard = () => {
    const baseUrl = 'http://localhost:3000';
    const currentPath = router.asPath;
    navigator.clipboard.writeText(`${baseUrl}${currentPath}`);
    showCopyAlert();
  };

  return (
    <div className='flex flex-col justify-center items-center w-[50px] h-[100px] p-3 rounded-full bg-slate-200 fixed top-[100px] left-[50px] z-10'>
      {/* 좋아요 */}
      {userInfo.isLoggedIn ? (
        isLiked ? (
          <FcLike
            className='cursor-pointer mb-[10px]'
            size={30}
            onClick={toggleLikes}
          />
        ) : (
          <FcLikePlaceholder
            className='cursor-pointer mb-[10px]'
            size={30}
            onClick={toggleLikes}
          />
        )
      ) : (
        <FcLikePlaceholder
          className='cursor-pointer mb-[10px]'
          size={30}
          onClick={showLoginAlert}
        />
      )}

      {/* 공유하기 */}
      <FaShareAlt
        size={30}
        className='cursor-pointer'
        onClick={copyClipboard}
      />
    </div>
  );
};

export default ReviewLikes;
