import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import * as httpRequest from '~/utils/httpRequest';
import * as villageService from './villageService';
const API_URL = '/SmallHolder/';

type DataVillage = {
  _id: string;
  smallHolderId: string[];
  adminId: string[];
  name: string;
  address: string;
  majorWork: string;
  quantitySmallHolder: string;
  materials: string[];
  avatar: string;
  photos: string[];
  description: string;
  group: string;
  createdAt: Date;
  updatedAt: Date;
}[];

type InitialState = {
  villages: DataVillage;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
};

const initialState: InitialState = {
  villages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// getAll Product
export const getAllVillages = createAsyncThunk(
  'Village/getAll',
  async (token: string, thunkAPI) => {
    try {
      const response = await villageService.getAllVillage(token);
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
  name: 'villages',
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
      .addCase(getAllVillages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllVillages.fulfilled,
        (state, action: PayloadAction<DataVillage>) => {
          state.isLoading = false;
          state.isSuccess = true;
          console.log(action.payload);

          state.villages = action.payload;
        },
      )
      .addCase(getAllVillages.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.villages = [];
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
