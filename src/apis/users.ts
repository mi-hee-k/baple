import { supabase } from '@/libs/supabase';

export const getUserDataById = async (userId: string) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) {
    throw error;
  }
  return user;
};

export const updateUser = async (userId: string, newNickname: string) => {
  // 메타데이터 업데이트
  const { data, error } = await supabase.auth.updateUser({
    data: { nickname: newNickname },
  });
  // users 테이블 업데이트
  const { error: usersError } = await supabase
    .from('users')
    .update({ nickname: newNickname })
    .eq('id', userId);

  console.log('메타데이터 업뎃데이터', data);
  console.log('메타데이터 업뎃에러', error);
  console.log('users 테이블 업뎃에러', usersError);
};
