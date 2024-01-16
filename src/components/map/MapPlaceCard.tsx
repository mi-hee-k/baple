import { Tables } from '@/types/supabase';
import avatarDefault from '../../../public/images/avatar_default.jpg';
import React from 'react';
import Image from 'next/image';

const MapPlaceCard = ({ place }: { place: Tables<'places'> | null }) => {
  return (
    <>
      <div>
        <Image
          src={avatarDefault}
          alt='이미지'
          className='w-[70px] rounded-[50%]'
        />
      </div>
      <div className='text-black'>
        <div>{place?.place_name}</div>
      </div>
    </>
  );
};

export default MapPlaceCard;
