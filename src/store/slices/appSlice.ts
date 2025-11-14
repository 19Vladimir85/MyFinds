import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LocalStorage } from '../../utils/localStorage';

type RightColumnType = 'list' | 'card' | 'modal';
interface IAppSlice {
  rightColumnType: RightColumnType;
  openModal: boolean;
  user: string | null;
}

const userLs = new LocalStorage<string>('user');
const initialState: IAppSlice = {
  rightColumnType: 'list',
  openModal: false,
  user: userLs.get(),
};
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
    setUser: (store, action: PayloadAction<string | null>) => {
      store.user = action.payload;
    },
  },
});
export const { setRightColumnType, setOpenModal, setUser } = appSlice.actions;
export const appReducer = appSlice.reducer;
