import { configureStore } from '@reduxjs/toolkit';
import { findReducer } from './slices/findsSlice';
import { enableMapSet } from 'immer';
import { appReducer } from './slices/appSlice';
import { settingsReducer } from './slices/settingSlice';
import { districtReducer } from './slices/districtSlice';

enableMapSet();

export const store = configureStore({
  reducer: { findReducer, appReducer, settingsReducer, districtReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
