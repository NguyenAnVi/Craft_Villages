import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import * as httpRequest from '~/utils/httpRequest';
const API_URL = '/auth/';

type User = {
  email: string,
  password: string,
}
type DataUser = {
  email: string;
  phone: string;
  profile: {
    fullName: string,
    gender: string,
    picture: string,
  },
  roleAdmin: string,
  isAdmin: boolean,
  village_id: string,
}

type Payload = {
  message: string;
  status: boolean;
  data: {
    email: string;
    phone: string;
    profile: {
      fullName: string,
      gender: string,
      picture: string,
    },
    roleAdmin: string,
    isAdmin: boolean,
    village_id: string,
  },

}
// Get user from localStorage
const user: DataUser = JSON.parse(localStorage.getItem('user')!);

type InitialState = {
  user: DataUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  isSuccessLogout: boolean;

};

const initialState: InitialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isSuccessLogout: false,

};

// signUp user
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: User, thunkAPI) => {
    try {
      const response = await httpRequest.post(API_URL + 'signUp', userData);
      if (response) {
        localStorage.setItem('user', JSON.stringify(response));
        return response;
      }
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

// signIn user
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userData: User, thunkAPI) => {
    try {
      const response = await httpRequest.post(API_URL + 'signIn', userData);
      if (response) {
        localStorage.setItem('user', JSON.stringify(response));
        return response;
      }
    } catch (error) {

      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await httpRequest.post(API_URL + 'logout');
    if (response) {
      localStorage.removeItem('user');
      return response;
    }
  }
  catch (err) {
    console.log(err);
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isSuccessLogout = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<Payload>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(signUp.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<Payload>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message
        state.user = action.payload.data;
      })
      .addCase(signIn.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action: AnyAction) => {
        state.user = null;
        state.isSuccessLogout = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
