import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllComments } from '@/apis/comments';
import CommentCard from './CommentCard';
import { Spacer } from '@nextui-org/react';

interface Props {
  reviewId: string;
}

const CommentList = ({ reviewId }: Props) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', reviewId],
    queryFn: () => getAllComments(reviewId),
    // select: (data) => ({
    //   reversed: data?.reverse(),
    // }),
  });
  console.log('comments 이걸 순서대로 하자는거지?', comments);

  if (isLoading) {
    return <p>댓글 정보 불러오는중...</p>;
  }

  return (
    <>
      {comments?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      <Spacer y={10} />
    </>
  );
};

export default CommentList;
