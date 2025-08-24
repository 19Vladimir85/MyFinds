import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type RightColumnType = 'list' | 'card' | 'modal';
interface IAppSlice {
  rightColumnType: RightColumnType;
}
const initialState: IAppSlice = { rightColumnType: 'list' };
const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setRightColumnType: (store, action: PayloadAction<RightColumnType>) => {
      store.rightColumnType = action.payload;
    },
  },
});
export const { setRightColumnType } = appSlice.actions;
export const appReducer = appSlice.reducer;
