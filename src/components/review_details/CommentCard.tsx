import React from 'react';
import { Avatar, Button, Card, CardBody } from '@nextui-org/react';
import { formatDate } from '@/utils/dateFormatter';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/apis/comments';
import { toast } from 'react-toastify';

import type { CommentsWithUser } from '@/types/types';

interface Props {
  comment: CommentsWithUser;
}

const CommentCard = ({ comment }: Props) => {
  const queryClient = useQueryClient();
  const deleteMutate = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success('삭제 완료', {
        position: 'top-right',
        autoClose: 2000,
        progress: undefined,
        theme: 'light',
      });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const deleteBtnHandler = (commentId: string) => {
    deleteMutate.mutate(commentId);
  };

  return (
    <Card className=' max-w-[1200px] rounded-full'>
      <CardBody>
        <div className='flex gap-4 items-center'>
          <Avatar
            src={comment.users.avatar_url}
            showFallback
            className='h-100px ml-2 w-[60px]'
            radius='full'
            size='lg'
          />
          <div className='w-full flex justify-between'>
            <div className='flex flex-col'>
              <p className='text-md'>{comment.users.user_name}</p>
              <span>{comment.content}</span>
            </div>

            <div className='flex flex-col gap-3 items-end mr-6'>
              <span>{formatDate(comment.created_at)}</span>
              {/* <Button
                variant='ghost'
                color='danger'
                onClick={deleteBtnHandler.bind(null, comment.id)}
                fullWidth={false}
                size='sm'
              >
                X
              </Button> */}
              <button className='border w-7 border-primary text-primary'>
                X
              </button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
