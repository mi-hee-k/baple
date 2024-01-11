import React, { useRef, useState } from 'react';
import type { Tables } from '@/types/supabase';
import { Button, Spacer } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { updateReviewContent } from '@/apis/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  review: Tables<'reviews'>;
}

const NoSsrEditor = dynamic(() => import('../common/TuiEditor'), {
  ssr: false,
});

const ReviewBody = ({ review }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [editValue, setEditValue] = useState('');
  const { id, created_at, content, user_id, place_id } = review;

  const queryClient = useQueryClient();
  const updateReviewMutate = useMutation({
    mutationFn: updateReviewContent,
    onSuccess: () => {
      // toast.success('삭제 완료', {
      //   position: 'top-right',
      //   autoClose: 2000,
      //   progress: undefined,
      //   theme: 'light',
      // });
      queryClient.invalidateQueries({ queryKey: ['review'] });
      setIsEditing(false);
    },
  });

  // console.log(editValue);
  const ref = useRef<any>(null);

  const editDoneButtonHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('수정완료버튼 연결');
    try {
      const editorIns = ref?.current?.getInstance();
      const editContentHTML = editorIns.getHTML();
      const editValue = editorIns.getMarkdown();
      console.log('as html>>', editContentHTML, 'as MD>>', editValue);
      updateReviewMutate.mutate({ id, editValue });
    } catch {
      console.error('알수 없는 오류 발생');
    }
  };

  return (
    <>
      {!isEditing && (
        <textarea className='w-[100%] h-[300px] resize-none'>
          {content}
        </textarea>
      )}
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
