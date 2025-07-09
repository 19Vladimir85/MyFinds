import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IFind } from '../../types';

interface IFindSlice {
  finds: FindSlice;
}

// type FindSlice = Map<string, IFind>;
type FindSlice = Record<string, IFind>;

const initialState: IFindSlice = { finds: {} };

const findSlice = createSlice({
  name: 'findSlice',
  initialState,
  reducers: {
    addFind: (state, action: PayloadAction<IFind>) => {
      console.log(action);
      state.finds[action.payload.coordinate] = action.payload;
    },
  },
});

export const { addFind } = findSlice.actions;
export const findReducer = findSlice.reducer;
