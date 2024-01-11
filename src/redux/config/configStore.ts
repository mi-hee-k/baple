import auth from '../../redux/modules/authSlice';
import { configureStore } from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof store.getState>;
const store = configureStore({
  reducer: { auth },
});
export default store;

const onChange = () => {
  console.log('리덕스스토어', store.getState());
};

store.subscribe(onChange);
