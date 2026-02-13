import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDistrict, getDistrict } from '../../api/districtsApi';
import type { IDistrict } from '../../types';

export const addDistrictThunk = createAsyncThunk(
  'district/add',
  async (district: IDistrict) => {
    return await addDistrict(district);
  },
);

export const getDistrictThunk = createAsyncThunk('district/get', async () => {
  return await getDistrict();
});
