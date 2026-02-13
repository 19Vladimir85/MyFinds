import { createSlice } from '@reduxjs/toolkit';
import { addDistrictThunk, getDistrictThunk } from '../thunk/districtThunk';
import type { IDistrict } from '../../types';

interface IDistrictSlice {
  districts: IDistrict[];
}

const initialState: IDistrictSlice = { districts: [] };
const districtSlice = createSlice({
  name: 'findSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDistrictThunk.fulfilled, (state, action) => {
      state.districts.push(action.payload);
    });
    builder.addCase(getDistrictThunk.fulfilled, (state, action) => {
      state.districts = action.payload;
    });
  },
});

export const districtReducer = districtSlice.reducer;
