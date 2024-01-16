import { MergeDeep } from 'type-fest';
import { Database as DatabaseGenerated } from './supabase.d.ts';

import type { Tables } from '@/types/supabase';

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
  username: string;
}

export interface ReviewUpdateParams {
  id: string;
  editValue: string;
}

export interface CommentsWithUser extends Tables<'comments'> {
  users: {
    avatar_url: string;
    user_name: string;
  };
}

export interface PlacesWithBookmarksReviews extends Tables<'places'> {
  bookmarks: {
    id: string;
    place_id: string;
    user_id: string;
  }[];
  reviews: {
    content: string;
    created_at: string;
    id: string;
    images_url: string[];
    place_id: string;
    user_id: string;
  }[];
}

export interface ReviewWithLikesAndComments extends Tables<'reviews'> {
  likes: {
    id: string;
    review_id: string;
    user_id: string;
  }[];
  comments: {
    id: string;
    review_id: string;
    user_id: string;
    content: string;
    created_at: string;
  }[];
  users: {
    user_name: string;
  };
}
