import ReviewBody from '@/components/review_details/ReviewBody';
import React from 'react';

const ReviewPage = () => {
  const REVIEW_ID = '4f65baa2-4677-4ac0-b1dc-ce075aa6e501';
  return (
    <div>
      <section className='h-72 bg-slate-100'>캐러셀 들어갈 부분</section>
      <ReviewBody reviewId={REVIEW_ID} />
      <section>댓글 입력</section>
      <section>댓글 list </section>
    </div>
  );
};

export default ReviewPage;
