import React, { useRef, useState } from 'react';
import type { Tables } from '@/types/supabase';
import { Button, Spacer } from '@nextui-org/react';
import dynamic from 'next/dynamic';

interface Props {
  review: Tables<'reviews'>;
}

const NoSsrEditor = dynamic(() => import('../common/TuiEditor'), {
  ssr: false,
});

const ReviewBody = ({ review }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const { id, created_at, content, user_id, place_id } = review;

  console.log(editValue);
  const ref = useRef<any>(null);

  return (
    <>
      {!isEditing && <p>{content}</p>}
      {isEditing && <NoSsrEditor content={content} editorRef={ref} />}
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
