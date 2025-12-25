import { createSlice } from '@reduxjs/toolkit';
import type { IFind } from '../../types';
import {
  addFindThunk,
  fetchFindsThunk,
  deleteFindThunk,
  updateFindThunk,
} from '../thunk/findsThunk';

interface IFindSlice {
  finds: Finds;
}

// type FindSlice = Map<string, IFind>;
type Finds = Record<string, IFind>;

const initialState: IFindSlice = { finds: {} };
const findSlice = createSlice({
  name: 'findSlice',
  initialState,
  reducers: {},
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
    builder.addCase(updateFindThunk.fulfilled, (state, action) => {
      state.finds[action.payload.coordinate] = action.payload;
    });
    builder.addCase(deleteFindThunk.fulfilled, (state, action) => {
      delete state.finds[action.payload.coordinate!];
    });
  },
});

export const findReducer = findSlice.reducer;
