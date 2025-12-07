import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IFind } from '../../types';
import { addFindThunk, fetchFindsThunk } from '../thunk/findsThunk';

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
    deleteFind: (state, action: PayloadAction<string>) => {
      delete state.finds[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFindThunk.fulfilled, (state, action) => {
      state.finds[action.payload.coordinate!] = action.payload;
    });
    builder.addCase(fetchFindsThunk.fulfilled, (state, action) => {
      const finds: Finds = {};
      action.payload.forEach((el: IFind) => {
        finds[el.coordinate] = el;
      });
      state.finds = finds;
    });
  },
});

export const { deleteFind } = findSlice.actions;
export const findReducer = findSlice.reducer;
