import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from '@nextui-org/react';
import { Tables } from '@/types/supabase';

const CommentCard = ({ comment }: any) => {
  console.log('코멘트?', comment);
  return (
    <Card className=' max-w-[1000px]'>
      <CardBody>
        <div className='flex gap-4'>
          <div className='flex flex-col'>
            <img
              src={comment.users.avatar_url}
              alt='유저 프사'
              className='h-11 w-11'
            />
            <p className='text-md'>{comment.users.nickname}</p>
          </div>
          <Divider orientation='vertical' className='border-gray-800' />
          <span>{comment.content}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
