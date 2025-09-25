import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IFind } from '../../types';
import { LocalStorage } from '../../utils/localStorage';

interface IFindSlice {
  finds: Finds;
}

// type FindSlice = Map<string, IFind>;
type Finds = Record<string, IFind>;
const findsLS = new LocalStorage<Finds>('finds');
const initialState: IFindSlice = { finds: findsLS.get() || {} };
const findSlice = createSlice({
  name: 'findSlice',
  initialState,
  reducers: {
    addFind: (state, action: PayloadAction<IFind>) => {
      state.finds[action.payload.coordinate] = action.payload;
      findsLS.set(state.finds);
    },
    deleteFind: (state, action: PayloadAction<string>) => {
      delete state.finds[action.payload];
      findsLS.set(state.finds);
    },
  },
});

export const { addFind, deleteFind } = findSlice.actions;
export const findReducer = findSlice.reducer;
