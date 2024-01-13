import { supabase } from '@/libs/supabase';

interface Props {
  userId: string;
  reviewId: string;
}

// 좋아요 추가
export const insertLikes = async ({ userId, reviewId }: Props) => {
  const { data, error } = await supabase
    .from('likes')
    .insert({ user_id: userId, review_id: reviewId })
    .select();
  if (error) {
    throw error;
  }
  // console.log('좋아요 성공', data);
  return data;
};

// 좋아요 가져오기
export const getLikes = async ({ userId, reviewId }: Props) => {
  const { data, error } = await supabase
    .from('likes')
    .select()
    .eq('review_id', reviewId)
    .eq('user_id', userId);

  if (error) {
    throw error;
  }
  return data;
};

// 좋아요 삭제
export const deleteLikes = async ({ userId, reviewId }: Props) => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('review_id', reviewId);

  if (error) {
    console.log(error);
  }
  // console.log('좋아요 삭제');
};
