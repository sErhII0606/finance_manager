import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addDataToLocalStorage,
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from "../../util/localStorege";

import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
  addUserCashBalanceThunk,
  updateUserCashBalanceThunk,
  getUserCashBalanceThunk,
} from "./userThunk";
const initialState = {
  isLoading: false,
  user: getDataFromLocalStorage("user", null),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  registerUserThunk
);
export const loginUser = createAsyncThunk("user/loginUser", loginUserThunk);
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
export const addUserCashBalance = createAsyncThunk(
  "user/addUserCashBalance",
  addUserCashBalanceThunk
);
export const updateUserCashBalance = createAsyncThunk(
  "user/updateUserCashBalance",
  updateUserCashBalanceThunk
);
export const getUserCashBalance = createAsyncThunk(
  "user/getUserCashBalance",
  getUserCashBalanceThunk
);

const userSlice = createSlice({
  name: "user",
  balance: 0,
  initialState,
  reducers: {
    logout: (state, { payload }) => {
      state.user = null;
      removeDataFromLocalStorage("user");
      removeDataFromLocalStorage("cards");
      removeDataFromLocalStorage("transactions");
      toast.warn(payload);
    },
    setBalance: (state, { payload }) => {
      state.balance = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        //const user = payload;
        state.isLoading = false; /* 
        state.user = {
          nickname: user.nickname,
          email: user.email,
          userId: user.Value, //AccessToken
          // refreshToken: user.AuthenticationResult.RefreshToken,
          // idToken: user.AuthenticationResult.IdToken,
          // accessToken: user.AuthenticationResult.AccessToken,
        };
        addDataToLocalStorage("user", {
          nickname: user.nickname,
          email: user.email,
          userId: user.Value, //AccessToken
          // refreshToken: user.AuthenticationResult.RefreshToken,
          // idToken: user.AuthenticationResult.IdToken,
          // accessToken: user.AuthenticationResult.AccessToken,
        });
        toast.success(`Hello there ${user.nickname}`); */
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.isLoading = false;
        state.user = {
          nickname: user.nickname,
          email: user.email,
          userId: user.Value, //AccessToken
          refreshToken: user.AuthenticationResult.RefreshToken,
          idToken: user.AuthenticationResult.IdToken,
          accessToken: user.AuthenticationResult.AccessToken,
        };
        addDataToLocalStorage("user", {
          nickname: user.nickname,
          email: user.email,
          userId: user.Value, //AccessToken
          refreshToken: user.AuthenticationResult.RefreshToken,
          idToken: user.AuthenticationResult.IdToken,
          accessToken: user.AuthenticationResult.AccessToken,
        });
        toast.success(`Welcome back ${user.nickname}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(payload);
      })
      .addCase(addUserCashBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserCashBalance.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        state.user.cashBalance = payload.balance;
        addDataToLocalStorage("user", {
          ...getDataFromLocalStorage("user", null),
          cashBalance: payload.balance,
        });
      })
      .addCase(addUserCashBalance.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getUserCashBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCashBalance.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.user.cashBalance = payload.balance;

          addDataToLocalStorage("user", {
            ...getDataFromLocalStorage("user", null),
            cashBalance: payload.balance,
          });
        }
      })
      .addCase(getUserCashBalance.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUserCashBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserCashBalance.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.cashBalance = payload.balance;

        addDataToLocalStorage("user", {
          ...getDataFromLocalStorage("user", null),
          cashBalance: payload.balance,
        });
      })
      .addCase(updateUserCashBalance.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("ERROR");
      });
  },
});
export const { logout, setBalance } = userSlice.actions;
export default userSlice.reducer;
