import React from 'react';

import type { Tables } from '@/types/supabase';

interface Props {
  review: Tables<'reviews'>;
}

const ReviewBody = ({ review }: Props) => {
  const { id, created_at, content, user_id, place_id } = review;

  return (
    <>
      <p>{content}</p>
      <p>placeid:{place_id}</p>
      <p>userid:{user_id}</p>
    </>
  );
};

export default ReviewBody;
