import React from 'react';
import CommentCard from './CommentCard';
import { Spacer } from '@nextui-org/react';
import { CommentsWithUser } from '@/types/types';

interface Props {
  comments: CommentsWithUser[] | undefined;
  currentUserId: string;
}

const CommentList = ({ comments, currentUserId }: Props) => {
  if (comments?.length === 0) {
    return <p>등록된 댓글이 없습니다</p>;
  }
  return (
    <>
      {comments?.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
        />
      ))}
      <Spacer y={10} />
    </>
  );
};

export default CommentList;
