import React, { useState } from 'react';
import { Button, Spacer } from '@nextui-org/react';
import { updateReviewContent } from '@/apis/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Tables } from '@/types/supabase';

interface Props {
  review: Tables<'reviews'>;
}

const ReviewBody = ({ review }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id, created_at, content, user_id, place_id } = review;
  const [editValue, setEditValue] = useState(content);

  console.log('content', content);

  const queryClient = useQueryClient();

  const updateReviewMutate = useMutation({
    mutationFn: updateReviewContent,
    onMutate: async (updateReviewParams) => {
      await queryClient.cancelQueries({ queryKey: ['review', id] });
      const prevReview: object | undefined = queryClient.getQueryData([
        'review',
        id,
      ]);
      const updatedReview = {
        ...prevReview,
        content: updateReviewParams.editValue,
      };
      queryClient.setQueryData(['review', id], updatedReview);

      return { prevReview };
    },
    onError: (error, updateReviewParams, context) => {
      // Rollback to the previous review data in case of an error
      if (context?.prevReview) {
        queryClient.setQueryData(['review', id], context.prevReview);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['review', id] });
      setIsEditing(false);
    },
  });

  const editDoneButtonHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    updateReviewMutate.mutate({ id, editValue });
  };

  return (
    <>
      {!isEditing && (
        <textarea
          className='w-[1000px] h-[500px] text-black bg-white'
          value={content}
          disabled
        />
      )}
      {isEditing && (
        <form onSubmit={editDoneButtonHandler}>
          <textarea
            className='w-[1000px] h-[500px] text-black'
            onChange={(e) => {
              console.log(e.target.value);
              setEditValue(e.target.value);
            }}
            value={editValue}
          />
          <Button type='submit'>수정완료</Button>
        </form>
      )}
      <Button
        color='primary'
        onClick={() => {
          setIsEditing((prev) => !prev);
        }}
      >
        수정state토글
      </Button>
      <Spacer y={10} />
      <p>placeid:{place_id}</p>
      <p>userid:{user_id}</p>
    </>
  );
};

export default ReviewBody;
