import { configureStore } from '@reduxjs/toolkit';
import { findReducer } from './slices/findsSlice';
import { enableMapSet } from 'immer';

enableMapSet();

export const store = configureStore({
  reducer: { findReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
