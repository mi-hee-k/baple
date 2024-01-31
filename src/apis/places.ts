import { supabase } from '@/libs/supabase';
import { PlacesForPlaceCard, PlacesForSearch } from '@/types/types';
import { QueryFunction } from '@tanstack/react-query';
import { format } from 'path';

export const getPlaceInfo = async (id: string) => {
  const { data: placeInfo, error } = await supabase
    .from('places')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }
  // console.log('placeInfo', placeInfo);
  return placeInfo;
};

export const getPlaceInfoList = async (ids: string[]) => {
  const { data: placeInfoList, error } = await supabase
    .from('places')
    .select(
      `
    *,
    bookmarks(*),
    reviews(*)

  `,
    )
    .in('id', ids);

  if (error) {
    throw error;
  }

  return placeInfoList;
};

type Params = {
  id: string;
  imageUrl: string;
};

export const updatePlaceImage = async ({ id, imageUrl }: Params) => {
  const { error } = await supabase
    .from('places')
    .update({ image_url: imageUrl })
    .eq('id', id);

  if (error) throw error;
};
/*
export const fetchPlacesData = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: string[];
}) => {
  console.log('fetchPlacesData호출');
  const pageSize = 20;
  // const searchValue = queryKey[1] || ''; // queryKey에서 검색어를 추출합니다.
  console.log('페이지파람!!', pageParam);
  const [_, searchValue] = queryKey;
  const { data, error } = await supabase
    .from('places')
    .select()
    .ilike('place_name', `%${searchValue}%`)
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1); // 페이징

  if (error) throw error;
  return data;
};
*/

export const fetchPlacesData = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: string[];
}) => {
  const pageSize = 20;
  console.log('pageParam', pageParam);
  const [_, searchValue] = queryKey;
  console.log('searchValue', searchValue);
  let result;
  const { data: explainData, error } = await supabase
    .rpc('search_places', {
      p_search_value: searchValue,
    })
    // .from('places')
    // .select()
    // .ilike('place_name', `%${searchValue}%`)
    // .range((pageParam - 1) * pageSize, pageParam * pageSize - 1)
    .explain({ format: 'json', analyze: true });
  console.log('explainData', explainData);

  if (Array.isArray(explainData)) {
    result = explainData
      .map((item) => item.Plan)
      .map((item: any) => item.Plans)
      .map((item) => item[0])
      .map((item) => item)[0];
  }
  console.log('result', result);
  let query = supabase.rpc('search_places', {
    p_search_value: searchValue,
  });
  const { data } = await query.range((pageParam - 1) * 20, pageParam * 20 - 1);

  const resultPlaces = {
    total_length: result['Actual Rows'],
    data: data,
    page: pageParam,
    total_pages: Math.ceil(result['Actual Rows'] / 20),
  };
  console.log('resultPlaces', resultPlaces);
  if (resultPlaces) return resultPlaces;
};

export const getMyBookmarkedPlaces = async (userId: string) => {
  const { data, error } = await supabase.rpc('get_bookmarked_places', {
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }
  return data as PlacesForSearch[];
};

export const getTopReviewedPlaces = async () => {
  const { data, error } = await supabase.rpc('get_top_reviewed_places');

  if (error) {
    throw error;
  }
  return data as PlacesForSearch[];
};
export const getTopBookmarkedPlaces = async () => {
  const { data, error } = await supabase.rpc('get_top_bookmarked_places');

  if (error) {
    throw error;
  }
  return data as PlacesForSearch[];
};
