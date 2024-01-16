import { useRouter } from 'next/router';
import { formatDate } from '@/utils/dateFormatter';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react';
import { ReviewWithLikesAndComments } from '@/types/types';

interface Props {
  review: ReviewWithLikesAndComments;
}

const ReviewCard = ({ review }: Props) => {
  const router = useRouter();
  return (
    <Card
      className='flex flex-col w-[230px] p-3 rounded-xl shadow-xl cursor-pointer'
      isPressable
      onPress={() => router.push(`/review/${review.id}`)}
    >
      {/* 헤더 - 이미지 */}
      <CardHeader className='bg-slate-300 rounded-md w-full h-[180px] mb-[10px]'>
        Image
      </CardHeader>

      {/* 바디 - 유저정보 & 내용 */}
      <CardBody className='mb-[6px]'>
        <div className='flex items-center justify-between mb-[10px]'>
          <span className='inline-block font-bold text-xl'>
            {review.users.user_name}
          </span>
          <span className='text-gray-500'>{formatDate(review.created_at)}</span>
        </div>
        <div>
          <p className='w-[100%] h-[70px] bg-white overflow-hidden whitespace-pre-line overflow-ellipsis break-all line-clamp-3'>
            {review.content}
          </p>
        </div>
      </CardBody>

      {/* 푸터 - 좋아요 & 댓글 */}
      <CardFooter className='justify-end'>
        <span>❤ {review.likes.length} </span>
        <span className='ml-[6px]'>💬 {review.comments.length}</span>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
