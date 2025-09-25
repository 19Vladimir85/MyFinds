import { configureStore } from '@reduxjs/toolkit';
import { findReducer } from './slices/findsSlice';
import { enableMapSet } from 'immer';
import { appReducer } from './slices/appSlice';
import { settingsReducer } from './slices/settingSlice';

enableMapSet();

export const store = configureStore({
  reducer: { findReducer, appReducer, settingsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
