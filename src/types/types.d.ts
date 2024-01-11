import { MergeDeep } from 'type-fest';
import { Database as DatabaseGenerated } from './supabase.d.ts';
export { Json } from './supabase.d.ts';

// Override the type for a specific column in a view:
export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Views: {
        comments: {
          Row: {
            // id is a primary key in public.comments, so it must be `not null`
            id: string;
          };
        };
      };
    };
  }
>;

export interface User {
  userId: string;
  email: string;
  avatarUrl: string;
  nickname: string;
}
