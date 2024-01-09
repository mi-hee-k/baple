import React from 'react';
import { Card, CardBody, Divider } from '@nextui-org/react';
import { Tables } from '@/types/supabase';
import { formatDate } from '@/utils/dateFormatter';
import Image from 'next/image';

// Readonly<{ comment: Tables<'comments'> }> --> TS 타입지정 추후 적용 예정. 현재는 any

const CommentCard = ({ comment }: any) => {
  console.log('코멘트?', comment);
  return (
    <Card className=' max-w-[1000px]'>
      <CardBody>
        <div className='flex gap-4'>
          <div className='flex flex-col'>
            <Image
              src={comment.users.avatar_url}
              alt='유저 프사'
              className='h-11 w-11'
              width={50}
              height={50}
            />
            <p className='text-md'>{comment.users.nickname}</p>
          </div>
          <Divider orientation='vertical' className='border-gray-800' />
          <div className='w-full flex justify-between'>
            <span>{comment.content}</span>
            <span>{formatDate(comment.created_at)}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
