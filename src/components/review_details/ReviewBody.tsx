import React, { useEffect, useRef, useState } from 'react';
import { Button, Spacer } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { updateReviewContent } from '@/apis/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Tables } from '@/types/supabase';

interface Props {
  review: Tables<'reviews'>;
}

const NoSsrEditor = dynamic(() => import('../common/TuiEditor'), {
  ssr: false,
});
const NoSsrViewer = dynamic(() => import('../common/TuiViewer'), {
  ssr: false,
});

const ReviewBody = ({ review }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id, created_at, content, user_id, place_id } = review;

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

  const ref = useRef<any>(null);

  const editDoneButtonHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const editorIns = ref?.current?.getInstance();
      const editValue = editorIns.getMarkdown();
      updateReviewMutate.mutate({ id, editValue });
    } catch {
      console.error('알수 없는 오류 발생');
    }
  };

  return (
    <>
      {!isEditing && <NoSsrViewer content={content} />}
      {isEditing && (
        <form onSubmit={editDoneButtonHandler}>
          <NoSsrEditor content={content} editorRef={ref} />
          <Button type='submit'>수정완료</Button>
        </form>
      )}
      <Button
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
