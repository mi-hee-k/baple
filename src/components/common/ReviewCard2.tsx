import React from 'react';
import { Card, CardHeader, CardBody, Divider, Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { formatDate } from '@/utils/dateFormatter';
import Image from 'next/image';

import type { ReviewsFromRPC } from '@/types/types';

interface Props {
  review: ReviewsFromRPC;
}

const ReviewCard2 = ({ review }: Props) => {
  const {
    images_url,
    content,
    likes_count,
    comments_count,
    unique_review_id,
    place_name,
    user_name,
    user_avatar_url,
  } = review;

  return (
    <Link
      className='w-full hover:scale-[1.01] transition-all'
      href={`/review/${unique_review_id}`}
    >
      <Card className='w-full'>
        <CardHeader className='flex gap-3'>
          {images_url?.map((url) => (
            <Image
              key={url}
              alt='review images'
              src={url}
              height={40}
              width={40}
              className='max-h-[40px] max-w-[40px] rounded-md'
            />
          ))}
        </CardHeader>
        <CardBody>
          <div className='flex gap-5'>
            <Avatar showFallback src={user_avatar_url} />
            <div className='flex flex-col w-full'>
              <div className='flex gap-5 justify-between 이거!'>
                <div className='flex gap-5'>
                  <strong>{place_name}</strong>
                  <span>{user_name}</span>
                </div>
                <div className='flex gap-3'>
                  <span>{formatDate(review.created_at)}</span>
                  <span>댓글 수: {comments_count}</span>
                  <span>좋아요 수: {likes_count}</span>
                </div>
              </div>
              <p>{content}</p>
            </div>
          </div>
        </CardBody>
        <Divider />
      </Card>
    </Link>
  );
};

export default ReviewCard2;
