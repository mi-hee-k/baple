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
import { getReviewsByUserId } from '@/apis/reviews';

type Props = {
  userId: string;
};

const MyTabs = ({ userId }: Props) => {
  const { data: bookmarksPlaces, isLoading: isBookmarksLoading } = useQuery({
    queryKey: ['bookmark', userId],
    queryFn: () => getBookmarksByUserId(userId),
  });

  const { data: likedReviews, isLoading: isLikesLoading } = useQuery({
    queryKey: ['likes', userId],
    queryFn: () => getLikesByUserId(userId),
  });

  const { data: writtenReviews, isLoading: isWrittenReviewsLoading } = useQuery(
    {
      queryKey: ['reviews', userId],
      queryFn: () => getReviewsByUserId(userId),
    },
  );

  console.log('내가 북마크한 장소', bookmarksPlaces);
  console.log('내가 좋아요한 리뷰', likedReviews);
  console.log('내가 작성한 리뷰', writtenReviews);

  if (isBookmarksLoading || isLikesLoading) return <div>로딩중...</div>;

  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Options' color='primary'>
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
            <CardBody className='grid grid-cols-4 gap-4'>
              {likedReviews?.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
            </CardBody>
          </Card>
        </Tab>
        <Tab key='videos' title='내가 작성한 리뷰'>
          <Card>
            <CardBody className='grid grid-cols-4 gap-4'>
              {writtenReviews?.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MyTabs;
