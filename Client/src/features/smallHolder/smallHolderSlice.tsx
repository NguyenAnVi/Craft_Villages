import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import * as httpRequest from '~/utils/httpRequest';
import { getAllSmallHolderV2 } from './smallHolderService';
const API_URL = '/SmallHolder/';

type DataSmallHolder = {
  _id: string;
  villageId: string;
  adminId: string;
  productId: string[];
  workersId: string[];
  name: string;
  address: string;
  group: string;
  city: string;
  ward: string;
  district: string;
  majorWork: string;
  materials: string[];
  quantityWorkers: string;
  qrCode: string;
  description: string;
  exp: string;
  quantityProduct: string;
  avatar: string;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}[];

type InitialState = {
  smallHolders: DataSmallHolder;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
};

const initialState: InitialState = {
  smallHolders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// getAll Product
export const getAllSmallHolders = createAsyncThunk(
  'SmallHolder/getAll',
  async (token: string, thunkAPI) => {
    try {
      const response = await getAllSmallHolderV2(token);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const productSlice = createSlice({
  name: 'smallholders',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSmallHolders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllSmallHolders.fulfilled,
        (state, action: PayloadAction<DataSmallHolder>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.smallHolders = action.payload;
        },
      )
      .addCase(getAllSmallHolders.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.smallHolders = [];
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
