import React, { useEffect, useRef, useState } from 'react';
import type { Tables } from '@/types/supabase';
import { Button, Spacer } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { updateReviewContent } from '@/apis/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TuiViewer from '../common/TuiViewer';

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
  const [isRender, setIsRender] = useState(false);
  // const [editValue, setEditValue] = useState('');
  const { id, created_at, content, user_id, place_id } = review;

  console.log('content >>', content, 'id>>', id);

  const queryClient = useQueryClient();
  const updateReviewMutate = useMutation({
    mutationFn: updateReviewContent,
    onSuccess: () => {
      // toast.success('수정 완료', {
      //   position: 'top-right',
      //   autoClose: 2000,
      //   progress: undefined,
      //   theme: 'light',
      // });
      queryClient.invalidateQueries({ queryKey: ['review', id] });
      setIsEditing(false);
    },
  });

  // console.log(editValue);
  const ref = useRef<any>(null);

  const editDoneButtonHandler = async (e: React.FormEvent) => {
    e.preventDefault();
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

  useEffect(() => {
    setTimeout(() => {
      setIsRender((prev) => !prev);
    }, 1000);
  }, []);

  return (
    <>
      {!isEditing && (
        // <textarea className='w-[100%] h-[300px] resize-none'>
        //   {content}
        // </textarea>
        <NoSsrViewer content={content} />
        // <TuiViewer content={content} />
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
