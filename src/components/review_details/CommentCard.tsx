import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  avatar,
} from '@nextui-org/react';
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
    <Card className=' max-w-[1000px]'>
      <CardBody>
        <div className='flex gap-4'>
          <div className='flex flex-col'>
            <Avatar src='comment.users.avatar_url' showFallback />
            <p className='text-md'>{comment.users.user_name}</p>
          </div>
          <Divider orientation='vertical' className='border-gray-800' />
          <div className='w-full flex justify-between'>
            <span>{comment.content}</span>
            <div className='flex flex-col gap-3'>
              <span>{formatDate(comment.created_at)}</span>
              <Button
                variant='ghost'
                color='danger'
                onClick={deleteBtnHandler.bind(null, comment.id)}
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
