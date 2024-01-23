import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import newComment from '@/utils/newComment';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import { useForm, FieldErrors, FieldValues } from 'react-hook-form';
import { toastWarn } from '@/libs/toastifyAlert';
import { useComments } from '@/hooks/useComments';

interface Props {
  reviewId: string;
  placeId: string;
  commentsCount: number | undefined;
}

const CommentInput = ({ reviewId, placeId, commentsCount }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const { isLoggedIn, userId } = useSelector((state: RootState) => state.auth);
  const { insertComment } = useComments(userId as string, placeId);

  const [comment, setComment] = useState('');

  const submitComment = async () => {
    // e.preventDefault();
    if (!isLoggedIn) {
      toastWarn('로그인 후 이용해 주세요');
      return;
    }
    const newCommentData = new newComment(reviewId, userId, comment);
    insertComment(newCommentData);
    setComment('');
  };

  const onError = (errors: FieldErrors<FieldValues>) => {
    if (errors.comment) {
      const errMsg = errors.comment.message as string;
      toastWarn(errMsg);
    }
  };

  return (
    <div>
      <strong className='ml-2'>댓글</strong>
      <span className='px-[10px]'>댓글아이콘 : {commentsCount}</span>
      <form
        className='flex gap-5 items-center border border-t-2 border-b-2 border-l-0 border-r-0 border-primary py-[20px]'
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
        <Button color='primary' type='submit' className='w-[100px] h-[60px] '>
          입력
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
