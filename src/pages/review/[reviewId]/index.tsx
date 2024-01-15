import Carousel from '@/components/common/Carousel';
import MainWrapper from '@/components/layout/MainWrapper';
import CommentInput from '@/components/review_details/CommentInput';
import CommentList from '@/components/review_details/CommentList';
import ReviewBody from '@/components/review_details/ReviewBody';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { REVIEW_ID } from '@/constants/temp_develop';
import { getReviewById } from '@/apis/reviews';
import { Spacer } from '@nextui-org/react';
import Seo from '@/components/layout/Seo';
import { useRouter } from 'next/router';
import ReviewLikes from '@/components/review_details/ReviewLikes';

const ReviewPage = () => {
  const router = useRouter();
  const reviewId = router.query.reviewId as string;

  const {
    data: review,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => getReviewById(reviewId),
  });

  if (isLoading) {
    return <p>리뷰 데이터 로딩중...</p>;
  }

  if (error) {
    return <p>오류 발생...</p>;
  }

  if (review) {
    const imgUrl = review.images_url as string[];
    return (
      <>
        <MainWrapper>
          <Seo title='Review' />
          <ReviewLikes review={review} />
          {review?.images_url && (
            <Carousel
              slideData={imgUrl}
              slideHeight={'300px'}
              slidesPerView={4}
            />
          )}
          <Spacer y={10} />
          <ReviewBody review={review} />
          <Spacer y={10} />
          <CommentInput reviewId={review.id} />
          <Spacer y={10} />
          <div className='flex flex-col gap-4'>
            <CommentList reviewId={review.id} />
          </div>
        </MainWrapper>
      </>
    );
  }
};

export default ReviewPage;
