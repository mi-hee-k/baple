import auth from '../../redux/modules/authSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
/*
// redux-persist의 Storage 타입 가져오기
type CustomStorage = typeof storage & {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

const rootReducer = combineReducers({
  auth,
});

// persist 설정
const persistConfig: PersistConfig<
  {
    auth: {
      isLoggedIn: boolean;
      userId: null;
      email: null;
      avatarUrl: null;
      nickname: null;
    };
  },
  any,
  CustomStorage,
  any
> = {
  key: 'auth',
  storage: storage as CustomStorage,
  whitelist: ['authSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


const persistor = persistStore(store);

export { store, persistor };
*/

export type RootState = ReturnType<typeof store.getState>;
const store = configureStore({
  reducer: { auth },
});
export default store;

// const rootReducer = combineReducers({
//   auth,
// });

// const store = configureStore({
//   reducer: rootReducer,
// });

// const getStore = () => store;
// export default store;

const onChange = () => {
  console.log('리덕스스토어', store.getState());
};

store.subscribe(onChange);
