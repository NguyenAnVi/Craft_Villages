import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import authReducer from '~/features/auth/authSlice';
import productReducer from '~/features/product/productSlice';
import smallHolderReducer from '~/features/smallHolder/smallHolderSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const productPersistConfig = {
  key: 'products',
  storage: storageSession,
};
const smallHolderPersistConfig = {
  key: 'smallHolders',
  storage: storageSession,
};
const rootReducer = combineReducers({
  // products: persistReducer(productPersistConfig, productReducer),
  // smallHolders: persistReducer(smallHolderPersistConfig, smallHolderReducer),
  smallHolders: smallHolderReducer,
  products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
