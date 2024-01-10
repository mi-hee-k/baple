import { createSlice } from '@reduxjs/toolkit';

const session =
  typeof window !== 'undefined' &&
  JSON.parse(
    localStorage.getItem('sb-viqpcjrcqjtetxqetmpo-auth-token') as string,
  );

const isLocalStorage =
  typeof window !== 'undefined' &&
  !!localStorage.getItem('sb-viqpcjrcqjtetxqetmpo-auth-token');

const initialState = {
  isLoggedIn: isLocalStorage ? true : false,
  // userInfo: isLocalStorage ? session.user : null,
  userId: isLocalStorage ? session.user.id : null,
  email: isLocalStorage ? session.user.email : null,
  avatarUrl: isLocalStorage ? session.user.user_metadata.avatar_url : null,
  nickname: isLocalStorage ? session.user.user_metadata.nickname : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log('리덕스페이로드', action.payload);
      const { userId, email, avatarUrl, nickname } = action.payload;
      state.isLoggedIn = true;
      // state.userInfo = userInfo;
      state.userId = userId;
      state.email = email;
      state.avatarUrl = avatarUrl;
      state.nickname = nickname;
    },
  },
});

export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
