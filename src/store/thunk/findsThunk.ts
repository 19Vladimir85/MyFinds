import { getFinds, addFind, deleteFind } from '../../api/findsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IFind } from '../../types';

export const fetchFindsThunk = createAsyncThunk('finds/fetch', async () => {
  return await getFinds();
});

export const addFindThunk = createAsyncThunk(
  'finds/add',
  async (find: IFind) => {
    return await addFind(find);
  }
);

export const deleteFindThunk = createAsyncThunk(
  'finds/delete',
  async (index: number) => {
    return await deleteFind(index);
  }
);
