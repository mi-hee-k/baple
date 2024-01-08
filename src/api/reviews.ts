import { supabase } from '@/libs/supabase';

export const fetchReview = async (id: string) => {
  console.log('id', id);
  let { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id);
  console.log('reviews.ts 에서 읽은 부분>>', review, '에러>>', error);
  if (error) {
    throw error;
  }
  return review;
};
