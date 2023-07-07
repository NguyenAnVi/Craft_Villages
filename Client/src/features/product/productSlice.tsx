import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import * as httpRequest from '~/utils/httpRequest';
import { getAllProductV2 } from './productService';
const API_URL = '/Product/';

type Product = {
  email: string;
  password: string;
};
type DataProduct = [
  {
    _id: string;
    smallHolderId: string;
    name: string;
    materials: string;
    price: number;
    type: string;
    avatar: string;
    photos: string[];
    description: string;
    qrCode: string;
    createdAt: Date;
    updatedAt: Date;
  },
];

type InitialState = {
  products: any[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
};

const initialState: InitialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// getAll Product
export const getAllProducts = createAsyncThunk(
  'Product/getAll',
  async (token: string, thunkAPI) => {
    try {
      const response = await getAllProductV2(token);

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
  name: 'product',
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
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<DataProduct>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload;
        },
      )
      .addCase(getAllProducts.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.products = [];
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
