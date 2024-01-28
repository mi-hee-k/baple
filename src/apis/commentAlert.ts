import { supabase } from '@/libs/supabase';

export const commentsAlert = async () => {
  await supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        schema: 'public', // Subscribes to the "public" schema in Postgres
        event: '*', // Listen to all changes
      },
      (payload) => console.log(payload),
    )
    .subscribe();
};

commentsAlert();
