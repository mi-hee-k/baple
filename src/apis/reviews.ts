import { supabase } from '@/libs/supabase';

import type { Tables } from '@/types/supabase';
import type { ReviewUpdateParams } from '@/types/types';
// 리뷰 아이디 가져오기
export const getReviewById = async (id: string) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    throw error;
  }
  return review as Tables<'reviews'>;
};

// 리뷰 이미지 가져오기
export const getReviewImgList = async (id: string) => {
  const { data: reviewImgList, error } = await supabase
    .from('reviews')
    .select('images_url')
    .eq('place_id', id);

  if (error) {
    throw error;
  }
  return reviewImgList?.map((item) => item.images_url).flat() as string[];
};

export const updateReviewContent = async ({
  id,
  editValue,
}: ReviewUpdateParams) => {
  const { data, error } = await supabase
    .from('reviews')
    .update({ content: editValue })
    .eq('id', id)
    .select();
};
