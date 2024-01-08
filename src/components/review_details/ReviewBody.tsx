import { getReviewById } from '@/apis/reviews';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Props {
  reviewId: string;
}

const ReviewBody = ({ reviewId }: Props) => {
  const { data: review, isLoading } = useQuery({
    queryKey: ['review'],
    queryFn: () => getReviewById(reviewId),
  });

  console.log('쿼리에서 읽어온 부분', review);
  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (review) {
    const imgUrl = review[0].images_url[0];
    console.log(imgUrl);
    return (
      <>
        <p>{review[0].content}</p>
        <img src={imgUrl} alt='리뷰어가 올린 사진' className='w-[50%]' />
        <p>placeid:{review[0].place_id}</p>
        <p>userid:{review[0].user_id}</p>
      </>
    );
  }
};

export default ReviewBody;
