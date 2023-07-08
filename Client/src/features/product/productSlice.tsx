import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import * as productService from './productService';

type DataProduct = {
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
}[];
type PayLoad = {
  message: string;
  data: object;
};

type dataCU = {
  id: string;
  data: object;
  token: string;
};
type dataDelete = {
  id: string;
  token: string;
};

type InitialState = {
  products: DataProduct;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: InitialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// getAll Product
export const getAllProducts = createAsyncThunk(
  'Product/getAll',
  async (token: string, thunkAPI) => {
    try {
      const response = await productService.getAllProductV2(token);
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
export const createProduct = createAsyncThunk(
  'Product/Create',
  async (data: dataCU, thunkAPI) => {
    try {
      const response = await productService.createProduct(
        data.id,
        data.data,
        data.token,
      );
      return response;
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
export const updateProduct = createAsyncThunk(
  'Product/Update',
  async (data: dataCU, thunkAPI) => {
    try {
      const response = await productService.updateProduct(
        data.id,
        data.data,
        data.token,
      );
      return response;
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
export const deleteProduct = createAsyncThunk(
  'Product/Delete',
  async (data: dataDelete, thunkAPI) => {
    try {
      const response = await productService.deleteProduct(data.id, data.token);
      return response;
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
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
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
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(createProduct.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = [
          ...state.products.filter(
            (product) => product._id !== action.payload.data._id,
          ),
          action.payload.data,
        ];
        console.log(action.payload.data);

        state.message = action.payload.message;
      })
      .addCase(updateProduct.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.data._id,
        );
        state.message = action.payload.message;
      })
      .addCase(deleteProduct.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
