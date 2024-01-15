import { getCommentsByReviewId } from '@/apis/comments';
import { getLikes } from '@/apis/likes';
import { Tables } from '@/types/supabase';
import { LikedReviews } from '@/types/types';
import { formatDate } from '@/utils/dateFormatter';
import { Avatar, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  review: LikedReviews;
};

const ReviewCard = ({ review }: Props) => {
  const router = useRouter();
  console.log('reviewProps >> ', review);

  const { data: likes } = useQuery({
    queryKey: ['likes', review.id],
    queryFn: () => getLikes(review.id),
  });

  const { data: comments } = useQuery({
    queryKey: ['comments', review.id],
    queryFn: () => getCommentsByReviewId(review.id),
  });

  console.log('likesCount길이', likes?.length);
  console.log('comments길이', comments?.length);

  return (
    // <Link href={`/review/${review.id}`} key={review.id}>
    //   <div className='w-[300px] bg-slate-200 p-4 rounded-xl shadow-md'>
    //     <div className='flex flex-col'>
    //       {/* 이미지파트 */}
    //       <div className='bg-slate-300 w-full h-[150px] mb-[10px]'>Image</div>

    //       {/* 유저정보 파트 */}
    //       <div className=' flex mb-[10px] items-center justify-between'>
    //         <div className='flex items-center'>
    //           <Avatar showFallback src={review.users.avatar_url} />
    //           <span className='inline-block'>{review.users.user_name}</span>
    //         </div>
    //         <div>
    //           <span>{formatDate(review.created_at)}</span>
    //         </div>
    //       </div>
    //     </div>

    //     {/* 내용파트 */}
    //     <div>
    //       <div className='text-right'>
    //         <span className='mr-[6px]'>❤ {likes?.length} </span>
    //         <span className='mr-[6px]'>💬 {comments?.length}</span>
    //       </div>
    //       <p className='w-[100%] h-[100px] p-2 mt-2 bg-white'>
    //         {review.content}
    //       </p>
    //     </div>
    //   </div>

    // </Link>
    <Card
      shadow='sm'
      // key={index}
      isPressable
      onPress={() => router.push(`/review/${review.id}`)}
      className='p-2 w-[230px] h-[280px]'
    >
      <CardBody className='overflow-visible p-0'>
        <Image
          shadow='sm'
          radius='lg'
          width='100%'
          height={230}
          alt='review image'
          className='w-full object-cover h-[140px]'
          src={review?.images_url ? review?.images_url[0] : undefined}
        />
      </CardBody>
      <CardFooter className='text-small justify-between flex flex-col'>
        <div className='flex flex-row w-full justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar showFallback src={review.users.avatar_url} />
            <span>{review.users.user_name}</span>
          </div>
          {/* <div className='flex flex-col items-start'> */}
          <span className='text-gray-400 text-xs'>
            {formatDate(review.created_at)}
          </span>
        </div>
        <div className='flex flex-row justify-end'>
          <span className='mr-[6px]'>{comments?.length}개의 댓글</span>
          <span className='mr-[6px]'>❤️ {likes?.length}</span>
        </div>
        <p className='w-[100%] h-[100px] p-2 mt-2 bg-white'>{review.content}</p>
        {/* </div> */}
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
