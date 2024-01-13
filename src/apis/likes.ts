import { supabase } from '@/libs/supabase';

interface Props {
  userId: string;
  placeId: string;
}

// 좋아요 추가
export const insertLikes = async ({ userId, placeId }: Props) => {
  const { data, error } = await supabase
    .from('likes')
    .insert({ user_id: userId, place_id: placeId })
    .select();
  if (error) {
    throw error;
  }
  // console.log('북마크 성공', data);
  return data;
};

// 좋아요 가져오기
export const getLikes = async (userId: string, placeId: string) => {
  const { data, error } = await supabase
    .from('likes')
    .select()
    .eq('place_id', placeId)
    .eq('user_id', userId);

  if (error) {
    throw error;
  }
  return data;
};

// 좋아요 삭제
export const deleteLikes = async ({ userId, placeId }: Props) => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('place_id', placeId);

  if (error) {
    console.log(error);
  }
  // console.log('북마크 삭제');
};
