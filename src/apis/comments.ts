import { supabase } from '@/libs/supabase';
import { Tables } from '@/types/supabase';
import newComment from '@/utils/newComment';

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

export const insertNewComment = async (comment: newComment) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select();

  console.log('insert data>>', data, 'insert error>>', error);
};

export const deleteComment = async (commentId: string) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  console.log('delete error>>', error);
};
