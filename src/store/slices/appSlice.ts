import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type RightColumnType = 'list' | 'card' | 'modal';
interface IAppSlice {
  rightColumnType: RightColumnType;
  openModal: boolean;
}
const initialState: IAppSlice = { rightColumnType: 'list', openModal: false };
const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setRightColumnType: (store, action: PayloadAction<RightColumnType>) => {
      store.rightColumnType = action.payload;
    },
    setOpenModal: (store) => {
      store.openModal = !store.openModal;
    },
  },
});
export const { setRightColumnType, setOpenModal } = appSlice.actions;
export const appReducer = appSlice.reducer;
