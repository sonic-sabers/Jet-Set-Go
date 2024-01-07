import { createAsyncThunk } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import axios from 'axios';


const FLIGHT_API = 'https://api.npoint.io/4829d4ab0e96bfab50e7' || Config.FLIGHT_DATA_API

export const getflightData = createAsyncThunk(
  'api.npoint.io/getflightdata',
  (payload, { dispatch, getState }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
        } = getState();
        const res = await axios.get(FLIGHT_API);
        const baseURL = res.data?.data?.result
        // console.log('res', baseURL)
        resolve(baseURL);
      } catch (err) {
        reject(err);
      }
    });
  },
);

