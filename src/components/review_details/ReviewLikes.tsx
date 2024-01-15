import { deleteLikes, getLike, getLikes, insertLikes } from '@/apis/likes';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FaShareAlt } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FaPaperclip } from 'react-icons/fa';
import { Tables } from '@/types/supabase';
import { getPlaceInfo } from '@/apis/places';

interface Props {
  review: Tables<'reviews'>;
}
interface Likes {
  id: string;
  user_id: string;
  review_id: string;
}

const ReviewLikes = ({ review }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.auth);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isShown, setIsShown] = useState(false);

  const { data: placeInfo } = useQuery({
    queryKey: ['placeInfo', review.place_id],
    queryFn: () => getPlaceInfo(review.place_id),
    staleTime: Infinity,
  });

  const { data: likeState } = useQuery({
    queryKey: ['likes', userInfo.userId, review.id],
    queryFn: () => getLike({ userId: userInfo.userId, reviewId: review.id }),
  });

  const { data: likeCount } = useQuery({
    queryKey: ['likes', review.id],
    queryFn: () => getLikes(review.id),
  });

  console.log(likeCount);

  useEffect(() => {
    setIsLiked(likeState ? likeState.length > 0 : false);
  }, [likeState]);

  // 낙관적 업데이트 (추가)
  const addLikes = useMutation({
    mutationFn: insertLikes,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['likes', userInfo.userId, review.id],
      });
      const prev = queryClient.getQueryData([
        'likes',
        userInfo.userId,
        review.id,
      ]);
      const updateLikes = [{ user_id: userInfo.userId, review_id: review.id }];
      queryClient.setQueryData(
        ['likes', userInfo.userId, review.id],
        updateLikes,
      );
      return { prev };
    },
    onError: (error, updateReviewParams, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          ['likes', userInfo.userId, review.id],
          context.prev,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes', userInfo.userId, review.id],
      });
    },
  });

  // 낙관적 업데이트 (삭제)
  const delLikes = useMutation({
    mutationFn: deleteLikes,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['likes', userInfo.userId, review.id],
      });
      const prev = queryClient.getQueryData([
        'likes',
        userInfo.userId,
        review.id,
      ]);
      const updateLikes = undefined;
      queryClient.setQueryData(
        ['likes', userInfo.userId, review.id],
        updateLikes,
      );
      return { prev };
    },
    onError: (error, updateReviewParams, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          ['likes', userInfo.userId, review.id],
          context.prev,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes', userInfo.userId, review.id],
      });
    },
  });

  // 낙관적 업데이트 (좋아요 개수 추가)
  const plusLikesCount = useMutation({
    mutationFn: getLikes,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['likes', review.id],
      });
      const prev: Likes[] | undefined = queryClient.getQueryData([
        'likes',
        review.id,
      ]);
      const updateLikesCount = [
        ...(prev || []),
        { user_id: userInfo.userId, review_id: review.id },
      ];
      queryClient.setQueryData(['likes', review.id], updateLikesCount);
      return { prev };
    },
    onError: (error, updateReviewParams, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['likes', review.id], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes', review.id],
      });
    },
  });

  // 낙관적 업데이트 (좋아요 개수 빼기)
  const minusLikesCount = useMutation({
    mutationFn: getLikes,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['likes', review.id],
      });
      const prev: Likes[] | undefined = queryClient.getQueryData([
        'likes',
        review.id,
      ]);
      const updateLikesCount = prev?.slice(0, prev.length - 1);
      queryClient.setQueryData(['likes', review.id], updateLikesCount);
      return { prev };
    },
    onError: (error, updateReviewParams, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['likes', review.id], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes', review.id],
      });
    },
  });

  // 버튼 토글
  const toggleLikes = () => {
    if (isLiked) {
      setIsLiked(false);
      delLikes.mutate({ userId: userInfo.userId, reviewId: review.id });
      minusLikesCount.mutate(review.id);
    } else {
      setIsLiked(true);
      addLikes.mutate({ userId: userInfo.userId, reviewId: review.id });
      plusLikesCount.mutate(review.id);
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

  // 토글 공유 버튼
  const toggleShareBtn = () => {
    setIsShown((prev) => !prev);
  };

  // 카카오 공유
  const shareKaKao = async () => {
    await window.Kakao.Share.sendDefault({
      objectType: 'location',
      address: `${placeInfo?.address}`,
      addressTitle: `${placeInfo?.place_name}`,
      content: {
        title: 'Baple',
        description: `${placeInfo?.place_name}`,
        imageUrl:
          'https://velog.velcdn.com/images/jetiiin/post/3e477527-5e73-4a52-a8de-c0d1dec00f8a/image.png',
        link: {
          webUrl: `http://localhost:3000/place/${review.place_id}`,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            webUrl: `http://localhost:3000/place/${review.place_id}`,
          },
        },
      ],
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
    <div className='relative'>
      <div className='absolute left-[-70px] z-10'>
        {/* 좋아요 */}
        <div className='flex flex-col justify-center items-center fixed top-[120px] w-[50px] h-[120px] p-3 rounded-full bg-slate-200'>
          {userInfo.isLoggedIn ? (
            isLiked ? (
              <>
                <FcLike
                  className='cursor-pointer'
                  size={30}
                  onClick={toggleLikes}
                />
                <span className='mb-[4px]'>{likeCount?.length}</span>
              </>
            ) : (
              <>
                <FcLikePlaceholder
                  className='cursor-pointer'
                  size={30}
                  onClick={toggleLikes}
                />
                <span className='mb-[4px]'>{likeCount?.length}</span>
              </>
            )
          ) : (
            <FcLikePlaceholder
              className='cursor-pointer mb-[10px]'
              size={30}
              onClick={showLoginAlert}
            />
          )}
          {/* 공유하기 */}
          <div className='z-[5] relative w-full'>
            <div className='absolute'>
              <div
                className={`opacity-[${
                  isShown ? 100 : 0
                }] absolute w-[50px] h-[50px] bg-slate-300 top-[-40px] left-[44px] rounded-full flex justify-center items-center transition-opacity duration-200 ease-in-out`}
              >
                <RiKakaoTalkFill
                  size={24}
                  className='cursor-pointer'
                  onClick={shareKaKao}
                />
              </div>
              <div
                className={`opacity-[${
                  isShown ? 100 : 0
                }] absolute w-[50px] h-[50px] bg-slate-300 top-[20px] left-[44px] rounded-full flex justify-center items-center transition-opacity duration-200 ease-in-out`}
              >
                <FaPaperclip
                  size={24}
                  className='cursor-pointer'
                  onClick={copyClipboard}
                />
              </div>
            </div>
          </div>
          <FaShareAlt
            size={30}
            className='cursor-pointer'
            onClick={toggleShareBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewLikes;
