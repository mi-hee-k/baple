import { Tables } from '@/types/supabase';
import React from 'react';

const MapPlaceCard = ({ place }: { place: Tables<'places'> | null }) => {
  return (
    <div>
      <div>{place?.place_name}</div>
    </div>
  );
};

export default MapPlaceCard;
