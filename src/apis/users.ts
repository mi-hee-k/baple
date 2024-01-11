import { supabase } from '@/libs/supabase';

export const getUserDataById = async (id: string) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  console.log('users.ts 에서 읽은 부분>>', user);
  if (error) {
    throw error;
  }
  return user;
};
