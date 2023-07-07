import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';

import authReducer from '~/features/auth/authSlice';
import productReducer from '~/features/product/productSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const productPersistConfig = {
  key: 'products',
  storage: storageSession,
};
const rootReducer = combineReducers({
  products: persistReducer(productPersistConfig, productReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    persistedReducer,
  },
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
