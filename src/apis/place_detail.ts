import { supabase } from '@/libs/supabase';

export const getPlaceDetailImg = async () => {
  const { data } = await supabase.storage
    .from('place_detail_images')
    .getPublicUrl('firebase.png');
  console.log(data);
};

export const getImgList = async (id: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('images_url')
    .eq('place_id', id)
    .single();
  // console.log(data);
  return data;
};
