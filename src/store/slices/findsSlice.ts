import { createSlice } from '@reduxjs/toolkit';
import type { IFind } from '../../types';
import {
  addFindThunk,
  fetchFindsThunk,
  deleteFindThunk,
  updateFindThunk,
} from '../thunk/findsThunk';

interface IFindSlice {
  finds: IFind[];
}

const initialState: IFindSlice = { finds: [] };
const findSlice = createSlice({
  name: 'findSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFindThunk.fulfilled, (state, action) => {
      state.finds.push(action.payload);
    });
    builder.addCase(fetchFindsThunk.fulfilled, (state, action) => {
      state.finds = action.payload;
    });
    builder.addCase(updateFindThunk.fulfilled, (state, action) => {
      state.finds = state.finds.map((find) =>
        action.payload.id !== find.id ? find : action.payload,
      );
    });
    builder.addCase(deleteFindThunk.fulfilled, (state, action) => {
      state.finds = state.finds.filter((find) => find.id !== action.payload.id);
    });
  },
});

export const findReducer = findSlice.reducer;
