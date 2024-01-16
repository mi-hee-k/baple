import { Tables } from '@/types/supabase';
import { createSlice } from '@reduxjs/toolkit';

const initialState = <Tables<'places'>[] | null>[];

const placesDataSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    placesData: (state, action) => {
      console.log(action.payload);
      console.log(state);
      return (state = action.payload);
    },
  },
});

export default placesDataSlice.reducer;
export const { placesData } = placesDataSlice.actions;
