import { supabase } from '@/libs/supabase';
import { Tables } from '@/types/supabase';

export interface FormValues
  extends Omit<
    Tables<'boards'>,
    'id' | 'user_id' | 'created_at' | 'place_name'
  > {
  placeName: string;
  userId: string;
}

export const insertNewPost = async (formData: FormValues) => {
  const { userId, category, title, content, placeName } = formData;
  console.log(userId);
  const { data, error } = await supabase.from('boards').insert([
    {
      user_id: userId,
      category,
      title,
      content,
      place_name: placeName,
    },
  ]);
  console.log('post 추가 데이터 > ', data);
  if (error) throw error;
};
