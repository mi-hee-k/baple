import { supabase } from '@/libs/supabase';
import { Tables } from '@/types/supabase';

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
    .eq('place_id', id);

  console.log('getData후 결과', data?.map((item) => item.images_url).flat());
  return data?.map((item) => item.images_url).flat() as string[];
};
