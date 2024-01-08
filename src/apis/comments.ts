import { supabase } from '@/libs/supabase';

export const getAllComments = async (id: string) => {
  let { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('review_id', id);

  return comments;
};
