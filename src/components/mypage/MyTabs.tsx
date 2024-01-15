import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Image,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { getBookmarksByUserId } from '@/apis/bookmarks';
import { getLikesByUserId } from '@/apis/likes';
import ReviewCard from '../common/ReviewCard';
import { Tables } from '@/types/supabase';
import { LikedReviews } from '@/types/types';

type Props = {
  userId: string;
};

const MyTabs = ({ userId }: Props) => {
  const {
    data: bookmarksPlace,
    error,
    isLoading: isBookmarksLoading,
  } = useQuery({
    queryKey: ['bookmark', userId],
    queryFn: () => getBookmarksByUserId(userId),
  });

  const { data: likedReview, isLoading: isLikesLoading } = useQuery({
    queryKey: ['likes', userId],
    queryFn: () => getLikesByUserId(userId),
  });

  console.log('내가 북마크한 장소', bookmarksPlace);
  console.log('내가 좋아요한 리뷰', likedReview);

  if (isBookmarksLoading || isLikesLoading) return <div>로딩중...</div>;

  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Options'>
        <Tab key='photos' title='내가 북마크한 장소'>
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              porro eligendi aliquam libero ex, perspiciatis sed veniam
              consequatur ipsam accusamus soluta dolorum, repellendus laboriosam
              tempore molestias ipsum ab, esse deleniti.
            </CardBody>
          </Card>
        </Tab>
        <Tab key='music' title='내가 좋아요한 리뷰'>
          <Card>
            <CardBody className='grid grid-cols-3  gap-4'>
              {likedReview?.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
            </CardBody>
          </Card>
        </Tab>
        <Tab key='videos' title='내가 댓글을 남긴 리뷰'>
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MyTabs;
