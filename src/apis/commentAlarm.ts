import { supabase } from '@/libs/supabase';

interface AlarmInfoType {
  type: string;
  sender_id: string;
  received_id: string;
  message: string;
}

// 알림 추가
export const insertNewCommentAlarm = async (alarmInfo: AlarmInfoType) => {
  await supabase.from('alarm').insert([alarmInfo]);
};
