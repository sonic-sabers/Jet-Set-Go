import { createSlice } from '@reduxjs/toolkit';
import {
  getflightData,
} from './thunk';

const initialState = {
  flightData: [],
  flightDataLoading: false,

  error: '',
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {

    removeError(state) {
      state.error = '';
    },

  },
  extraReducers: builder => {
    builder.addCase(getflightData.pending, (state, { payload }) => {
      state.flightDataLoading = true;
    }),
      builder.addCase(getflightData.fulfilled, (state, { payload }) => {

        // console.log('payload', payload)
        state.flightData = payload;
      }),
      builder.addCase(getflightData.rejected, (state, { payload }) => {
        state.error = payload;
        state.flightDataLoading = false;
      });

  },
});

export const { removeSearchedResult, removeError, } =
  flightSlice.actions;

export default flightSlice.reducer;
