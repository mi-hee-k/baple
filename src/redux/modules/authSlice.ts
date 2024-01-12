import { createSlice } from '@reduxjs/toolkit';

const session =
  typeof window !== 'undefined' &&
  JSON.parse(
    localStorage.getItem(
      process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY as string,
    ) as string,
  );

const isLocalStorage =
  typeof window !== 'undefined' &&
  !!localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY as string);

const initialState = {
  isLoggedIn: isLocalStorage ? true : false,
  userId: isLocalStorage ? session.user.id : null,
  email: isLocalStorage ? session.user.email : null,
  avatarUrl: isLocalStorage ? session.user.user_metadata.avatar_url : null,
  nickname: isLocalStorage ? session.user.user_metadata.nickname : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInUser: (state, action) => {
      console.log('리덕스페이로드', action.payload);
      const { userId, email, avatarUrl, nickname } = action.payload;
      state.isLoggedIn = true;
      state.userId = userId;
      state.email = email;
      state.avatarUrl = avatarUrl;
      state.nickname = nickname;
    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.email = null;
      state.avatarUrl = null;
      state.nickname = null;
    },
    updateUser: (state, action) => {
      const { avatarUrl, nickname } = action.payload;
      state.avatarUrl = avatarUrl;
      state.nickname - nickname;
    },
  },
});

export const { logInUser, logOutUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
