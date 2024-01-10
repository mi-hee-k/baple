import { supabase } from '@/libs/supabase';

export const getReviewById = async (id: string) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single();
  console.log('reviews.ts 에서 읽은 부분>>', review, '에러>>', error);
  if (error) {
    throw error;
  }
  return review;
};
