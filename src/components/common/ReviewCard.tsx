import { Tables } from '@/types/supabase';
import { LikedReviews } from '@/types/types';
import { formatDate } from '@/utils/dateFormatter';
import Link from 'next/link';
import React from 'react';

type Props = {
  review: LikedReviews;
};

const ReviewCard = ({ review }: Props) => {
  console.log('reviewProps >> ', review);
  return (
    <Link href={`/review/${review.id}`} key={review.id}>
      <div className='w-[300px] bg-slate-200 p-4 rounded-xl shadow-md'>
        <div className='flex items-center justify-between'>
          {/* 리뷰헤더1 */}
          <div className=' flex mb-[10px]'>
            <div className='rounded-full w-[40px] h-[40px] mr-[10px] bg-slate-300'></div>
            <span className='inline-block'>닉네임</span>
          </div>
          {/* 리뷰헤더2 */}
          <div>
            <span>{formatDate(review.created_at)}</span>
          </div>
        </div>
        {/* 이미지파트 */}
        <div className='bg-slate-300 h-[150px] mb-[10px]'>Image</div>

        {/* 내용파트 */}
        <div>
          <span>❤</span>
          <span>💬</span>
          <p className='w-[100%] h-[100px] p-2 mt-2 bg-white'>
            {review.content}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
