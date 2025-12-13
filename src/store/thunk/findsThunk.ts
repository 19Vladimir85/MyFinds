import { getFinds, addFind, deleteFind, updateFind } from '../../api/findsApi';
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

export const updateFindThunk = createAsyncThunk(
  'finds/update',
  async ({ index, find }: { index: number; find: IFind }) => {
    return await updateFind(index, find);
  }
);
