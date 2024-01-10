import { supabase } from '@/libs/supabase';

// 리뷰 정보 (by Id)
export const getReviewById = async (id: string) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id);
  console.log('id', review);
  // console.log('reviews.ts 에서 읽은 부분>>', reviewId, '에러>>', error);
  if (error) {
    throw error;
  }
  return review;
};

// 리뷰 정보 (by placeId)
export const getReviewByPlaceId = async (placeId: string) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('place_id', placeId);
  console.log('review', review);
  if (error) {
    throw error;
  }
  return review;
};
