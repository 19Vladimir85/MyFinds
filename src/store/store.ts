import { configureStore } from '@reduxjs/toolkit';
import { findReducer } from './slices/findsSlice';
import { enableMapSet } from 'immer';
import { appReducer } from './slices/appSlice';

enableMapSet();

export const store = configureStore({
  reducer: { findReducer, appReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
