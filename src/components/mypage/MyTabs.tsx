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
import {
  getLikedReviews,
  getReviewsByUserId,
  getReviewsByUserIdrpc,
} from '@/apis/reviews';
import PlaceCard2 from '../common/PlaceCard2';
import ReviewCard2 from '../common/ReviewCard2';

type Props = {
  userId: string;
};

const MyTabs = ({ userId }: Props) => {
  const { data: bookmarkedPlaces, isLoading: isBookmarksLoading } = useQuery({
    queryKey: ['bookmark', userId],
    queryFn: () => getBookmarksByUserId(userId),
  });

  const { data: likedReviews, isLoading: isLikesLoading } = useQuery({
    queryKey: ['likes', userId],
    queryFn: () => getLikedReviews(userId),
  });

  console.log('좋아요 한 리뷰들>>', likedReviews);

  const { data: writtenReviews, isLoading: isWrittenReviewsLoading } = useQuery(
    {
      queryKey: ['reviews', userId],
      queryFn: () => getReviewsByUserIdrpc(userId),
    },
  );

  console.log('내가 북마크한 장소', bookmarkedPlaces);
  console.log('내가 좋아요한 리뷰', likedReviews);
  console.log('내가 작성한 리뷰', writtenReviews);

  if (isBookmarksLoading || isLikesLoading || isWrittenReviewsLoading)
    return <div>로딩중...</div>;

  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Options' color='primary'>
        <Tab key='photos' title='내가 북마크한 장소'>
          <Card>
            <CardBody className='grid grid-cols-4 gap-12'>
              {bookmarkedPlaces?.length !== 0 ? (
                bookmarkedPlaces?.map((place, idx) => (
                  <PlaceCard2 key={idx} place={place} />
                ))
              ) : (
                <div>북마크한 장소가 없습니다</div>
              )}
            </CardBody>
          </Card>
        </Tab>

        <Tab key='music' title='내가 좋아요한 리뷰'>
          {/* <Card>
            <CardBody className='grid grid-cols-4 gap-4'>
              {likedReviews?.length !== 0 ? (
                likedReviews?.map((review, idx) => (
                  <ReviewCard key={idx} review={review} />
                ))
              ) : (
                <div>좋아요한 리뷰가 없습니다</div>
              )}
            </CardBody>
          </Card> */}
          <Card>
            <CardBody className='flex flex-col gap-1'>
              {likedReviews?.map((review, idx) => (
                <ReviewCard2 review={review} key={idx} />
              ))}
            </CardBody>
          </Card>
        </Tab>

        <Tab key='videos' title='내가 작성한 리뷰'>
          {/* <Card>
            <CardBody className='grid grid-cols-4 gap-4'>
              {writtenReviews?.length !== 0 ? (
                writtenReviews?.map((review, idx) => (
                  <ReviewCard key={idx} review={review} />
                ))
              ) : (
                <div>작성한 리뷰가 없습니다.</div>
              )}
            </CardBody>
          </Card> */}
          <Card>
            <CardBody className='flex flex-col gap-1'>
              {writtenReviews?.map((review, idx) => (
                <ReviewCard2 key={idx} review={review} />
              ))}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MyTabs;
