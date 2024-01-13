import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import newComment from '@/utils/newComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertNewComment } from '@/apis/comments';
import { toast } from 'react-toastify';
// import { USER_ID } from '@/constants/temp_develop';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import { useForm, FieldErrors, FieldValues } from 'react-hook-form';

interface Props {
  reviewId: string;
}

const CommentInput = ({ reviewId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const { isLoggedIn, userId } = useSelector((state: RootState) => state.auth);
  console.log('로그인됨?>>', isLoggedIn, 'uid >>', userId);
  console.log('리액트훅폼 에러>>', errors);

  const [comment, setComment] = useState('');

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

  const submitComment = async () => {
    // e.preventDefault();
    if (!isLoggedIn) {
      toast.warning('로그인 후 이용해 주세요', {
        position: 'top-right',
        autoClose: 2000,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    const newCommentData = new newComment(reviewId, userId, comment);

    InsertMutate.mutate(newCommentData);

    setComment('');
  };

  const onError = (errors: FieldErrors<FieldValues>) => {
    if (errors.comment) {
      const errMsg = errors.comment.message as string;
      toast.warning(errMsg, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <p>댓글</p>
      <form
        className='flex gap-5 items-center'
        onSubmit={handleSubmit(submitComment, onError)}
      >
        <Input
          {...register('comment', {
            required: '등록할 내용이 없습니다',
            pattern: {
              value: /^\s*\S.*$/i,
              message: '공백이 아닌 내용을 입력하세요',
            },
          })}
          type='text'
          placeholder='댓글을 입력해 주세요'
          value={comment}
          data-required
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button
          color='primary'
          variant='ghost'
          type='submit'
          className='w-[100px] h-[60px]'
        >
          등록
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
