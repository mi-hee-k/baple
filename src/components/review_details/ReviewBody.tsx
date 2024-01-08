import { fetchReview } from '@/api/reviews';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Props {
  reviewId: string;
}

const ReviewBody = ({ reviewId }: Props) => {
  const { data: review, isLoading } = useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => fetchReview(reviewId),
  });

  console.log('쿼리에서 읽어온 부분', review);
  if (isLoading) {
    return <p>로딩중...</p>;
  }
  return <div>ReviewBody</div>;
};

export default ReviewBody;
