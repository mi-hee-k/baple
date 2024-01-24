import React from 'react';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useRouter } from 'next/router';

import type { PlacesForPlaceCard } from '@/types/types';

interface Props {
  place: PlacesForPlaceCard;
}

const PlaceCard = ({ place }: Props) => {
  const router = useRouter();
  // console.log('placeCardProps', place);
  const {
    bookmarks_count,
    reviews_count,
    city,
    image_url,
    place_name,
    unique_place_id,
  } = place;

  const imgURL =
    image_url !== null
      ? image_url
      : 'https://dummyimage.com/600x400/000/fff.png&text=baple';

  return (
    <div className='m-1'>
      <Card
        shadow='sm'
        // key={index}
        isPressable
        onPress={() => router.push(`/place/${unique_place_id}`)}
        className='p-2 w-[250px] h-[250px]'
      >
        <CardBody className='overflow-visible p-0'>
          <Image
            shadow='sm'
            radius='lg'
            width='100%'
            height={230}
            alt={place_name}
            className='w-full object-cover h-[140px]'
            src={imgURL}
          />
        </CardBody>
        <CardFooter className='text-small justify-between'>
          <div className='flex flex-col items-start'>
            <strong>{place_name}</strong>
            <div className='flex justify-between w-[210px]'>
              <div>
                <span>📑{reviews_count}</span>
                <span>🔖{bookmarks_count}</span>
              </div>
              <span className='text-s'>{city}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlaceCard;
