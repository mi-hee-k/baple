import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import newComment from '@/utils/newComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertNewComment } from '@/apis/comments';
import { toast } from 'react-toastify';

interface Props {
  reviewId: string;
}

const CommentInput = ({ reviewId }: Props) => {
  const [comment, setComment] = useState('');

  const USER_ID = '05a23d3d-a573-4f95-b7af-6b03779eb74b'; //AUTH 생길때까지 임시로 하드코딩

  const queryClient = useQueryClient();
  const InsertMutate = useMutation({
    mutationFn: insertNewComment,
    onSuccess: () => {
      toast.success('댓글이 성공적으로 등록되었습니다!', {
        position: 'top-right',
        autoClose: 2000,
        progress: undefined,
        theme: 'light',
      });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('연결됨');

    // 새로운 댓글 데이터 생성
    const newCommentData = new newComment(reviewId, USER_ID, comment);

    InsertMutate.mutate(newCommentData);

    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>댓글</p>
      <Input
        type='text'
        placeholder='댓글을 입력해 주세요'
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <Button color='primary' variant='ghost' type='submit'>
        등록
      </Button>
    </form>
  );
};

export default CommentInput;
