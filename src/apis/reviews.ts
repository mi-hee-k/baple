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

// 리뷰 정보 (by placeId)
export const getReviewByPlaceId = async (placeId: string) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('place_id', placeId);
  // console.log('review', review);
  if (error) {
    throw error;
  }
  return review;
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

interface InsertReviewParams {
  content: string;
  placeID: string;
  userID: string;
}

export const insertNewReview = async ({
  content,
  placeID,
  userID,
}: InsertReviewParams) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{ content: content, place_id: placeID, user_id: userID }])
    .select();
};
