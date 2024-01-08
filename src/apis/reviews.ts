import { supabase } from '@/libs/supabase';

export const getReviewById = async (id: string) => {
  console.log('id', id);
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id);
  console.log('reviews.ts 에서 읽은 부분>>', review, '에러>>', error);
  if (error) {
    throw error;
  }
  return review;
};
