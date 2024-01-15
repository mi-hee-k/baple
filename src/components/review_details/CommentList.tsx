import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllComments } from '@/apis/comments';
import CommentCard from './CommentCard';

interface Props {
  reviewId: string;
}

const CommentList = ({ reviewId }: Props) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', reviewId],
    queryFn: () => getAllComments(reviewId),
  });
  console.log('comments', comments);

  return (
    <>
      {comments?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
