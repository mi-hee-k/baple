import { supabase } from '@/libs/supabase';

export const getUserDataById = async (id: string) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    throw error;
  }
  return user;
};
