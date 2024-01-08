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

const CommentCard = () => {
  return (
    <Card className=' max-w-[1000px]'>
      <CardBody>
        <div className='flex gap-4'>
          <div className='flex flex-col'>
            <img src='' alt='유저 프사' />
            <p className='text-md'>유저 아이디</p>
          </div>
          <Divider orientation='vertical' />
          <span>
            Make beautiful websites regardless of your design experience.
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
