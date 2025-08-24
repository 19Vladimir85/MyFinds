import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IFind } from '../../types';

interface IFindSlice {
  finds: Finds;
}

// type FindSlice = Map<string, IFind>;
type Finds = Record<string, IFind>;

const initialState: IFindSlice = { finds: {} };

const findSlice = createSlice({
  name: 'findSlice',
  initialState,
  reducers: {
    addFind: (state, action: PayloadAction<IFind>) => {
      state.finds[action.payload.coordinate] = action.payload;
    },
    deleteFind: (state, action: PayloadAction<string>) => {
      delete state.finds[action.payload];
    },
  },
});

export const { addFind, deleteFind } = findSlice.actions;
export const findReducer = findSlice.reducer;
