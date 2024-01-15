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
// import Image from 'next/image';

type Props = {
  userId: string;
};

const MyTabs = ({ userId }: Props) => {
  // const [selected, setSelected] = useState('photos');
  console.log('userId', userId);
  const {
    data: bookmarks,
    error,
    isLoading: isBookmarksLoading,
  } = useQuery({
    queryKey: ['bookmark', userId],
    queryFn: () => getBookmarksByUserId(userId),
  });

  const { data: likes, isLoading: isLikesLoading } = useQuery({
    queryKey: ['likes', userId],
    queryFn: () => getLikesByUserId(userId),
  });

  console.log('내가 북마크한 장소', bookmarks);
  console.log('내가 좋아요한 리뷰', likes);

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
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
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
