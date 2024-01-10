import { supabase } from '@/libs/supabase';
import newComment from '@/utils/newComment';
import { Tables } from '@/types/supabase';

export interface CommentsWithUser extends Tables<'comments'> {
  users: {
    avatar_url: string;
    nickname: string;
  };
}

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

  return comments as CommentsWithUser[];
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
