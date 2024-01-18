import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Avatar,
} from '@nextui-org/react';
import Link from 'next/link';

import { formatDate } from '@/utils/dateFormatter';
import type { ReviewWithLikesUserComments } from '@/types/types';

interface Props {
  review: ReviewWithLikesUserComments;
}

const ReviewCard2 = ({ review }: Props) => {
  const { images_url, content, likes, comments, id } = review;

  return (
    <Link className='w-full' href={`/review/${id}`}>
      <Card className='w-full'>
        <CardHeader className='flex gap-3'>
          {images_url?.map((url) => (
            <Image
              key={url}
              alt='nextui logo'
              height={40}
              radius='sm'
              src={url}
              width={40}
            />
          ))}
        </CardHeader>
        <CardBody>
          <div className='flex gap-5'>
            <Avatar
              showFallback
              src={review.users.avatar_url as string | undefined}
            />
            <div className='flex flex-col w-full'>
              <div className='flex gap-5 justify-between 이거!'>
                <div className='flex gap-5'>
                  <strong>{review.places.place_name}</strong>
                  <span>{review.users.user_name}</span>
                </div>
                <div className='flex gap-3'>
                  <span>{formatDate(review.created_at)}</span>
                  <span>댓글 수: {comments.length}</span>
                  <span>좋아요 수: {likes.length}</span>
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
