import { supabase } from '@/libs/supabase';
import { Tables } from '@/types/supabase';

export const getAllComments = async (id: string) => {
  let { data: comments, error } = await supabase
    .from('comments')
    .select(
      `
    *,
    users (
      nickname, avatar_url
    )
  `,
    )
    .eq('review_id', id);

  return comments;
};
