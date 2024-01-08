import MainWrapper from '@/components/layout/MainWrapper';
import CommentInput from '@/components/review_details/CommentInput';
import CommentList from '@/components/review_details/CommentList';
import ReviewBody from '@/components/review_details/ReviewBody';
import React from 'react';

const ReviewPage = () => {
  const REVIEW_ID = '4f65baa2-4677-4ac0-b1dc-ce075aa6e501';
  return (
    <MainWrapper>
      <section className='h-72 bg-slate-100'>캐러셀 들어갈 부분</section>
      <ReviewBody reviewId={REVIEW_ID} />
      <CommentInput />
      <CommentList reviewId={REVIEW_ID} />
    </MainWrapper>
  );
};

export default ReviewPage;
