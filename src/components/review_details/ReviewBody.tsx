import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Button, Spacer } from '@nextui-org/react';

import type { Tables } from '@/types/supabase';
import { toastSuccess } from '@/libs/toastifyAlert';
import { useReviews } from '@/hooks/useReviews';
import TuiViewer from '../common/TuiViewer';
import dynamic from 'next/dynamic';

interface Props {
  review: Tables<'reviews'>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewBody = ({ review, isEditing, setIsEditing }: Props) => {
  const { id, created_at, content, user_id, place_id } = review;
  const [editValue, setEditValue] = useState(content);
  const [textareaHeight, setTextareaHeight] = useState(200);
  const { updateReview } = useReviews(setIsEditing, place_id, undefined, id);
  const editDoneButtonHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    updateReview({ id, editValue });
    toastSuccess('수정 완료되었습니다');
  };
  const NoSsrEditor = dynamic(() => import('../common/TuiViewer'), {
    ssr: false,
  });

  useEffect(() => {
    const textarea = document.querySelector('#review_textarea');
    console.log('이게 되냐?', textarea?.scrollHeight);
    if (textarea?.scrollHeight > 200) {
      setTextareaHeight(textarea?.scrollHeight);
    }
  }, []);
  console.log(textareaHeight);
  return (
    <>
      {!isEditing && (
        <textarea
          id='review_textarea'
          className={` w-full h-[${textareaHeight}px] min-h-[200px] text-black bg-white resize-none p-1`}
          value={content}
          disabled
          draggable={false}
        />
        // <NoSsrEditor content={content} />
      )}
      {isEditing && (
        <form onSubmit={editDoneButtonHandler}>
          <div className='flex flex-col items-center'>
            <textarea
              className='w-full h-[300px] text-black resize-none p-1'
              onChange={(e) => {
                console.log(e.target.value);
                setEditValue(e.target.value);
              }}
              value={editValue}
              draggable={false}
            />
            <Spacer y={3} />
            <Button color='primary' type='submit'>
              수정완료
            </Button>
          </div>
        </form>
      )}

      <Spacer y={10} />
    </>
  );
};

export default ReviewBody;
