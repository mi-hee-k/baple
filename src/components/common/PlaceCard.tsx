import React from 'react';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

import type { Tables } from '@/types/supabase';
import { useRouter } from 'next/router';

interface Props {
  place: Tables<'places'>;
}

const PlaceCard = ({ place }: Props) => {
  const router = useRouter();

  const imgURL = place.image_url;
  return (
    <div className='mt-1'>
      <Card
        shadow='sm'
        // key={index}
        isPressable
        onPress={() => router.push(`/place/${place.id}`)}
        className='p-2 w-[250px] h-[210px]'
      >
        <CardBody className='overflow-visible p-0'>
          <Image
            shadow='sm'
            radius='lg'
            width='100%'
            alt={place.place_name}
            className='w-full object-cover h-[140px]'
            src={imgURL || undefined}
          />
        </CardBody>
        <CardFooter className='text-small justify-between'>
          <div className='flex flex-col'>
            <strong>{place.place_name}</strong>
            <div className='flex justify-between'>
              <div>
                <span>📑</span>
                <span>🔖</span>
              </div>
              <p className='text-default-500'>{place.city}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlaceCard;
