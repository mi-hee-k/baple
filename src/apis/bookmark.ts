import { supabase } from '@/libs/supabase';

interface Props {
  userId: string;
  placeId: string;
}

// 북마크 추가
export const insertBookmark = async ({ userId, placeId }: Props) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({ user_id: userId, place_id: placeId })
    .select();
  if (error) {
    throw error;
  }
  console.log('북마크 성공', data);
  return data;
};

// 북마크 가져오기
export const getBookmark = async (userId: string, placeId: string) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select()
    .eq('place_id', placeId)
    .eq('user_id', userId);

  if (error) {
    throw error;
  }
  return data;
};

// 북마크 삭제
export const deleteBookmark = async ({ userId, placeId }: Props) => {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('place_id', placeId);

  if (error) {
    console.log(error);
  }
  console.log('북마크 삭제');
};
