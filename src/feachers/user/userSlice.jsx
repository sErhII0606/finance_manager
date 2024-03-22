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
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, { payload }) => {
      state.user = null;
      removeDataFromLocalStorage("user");
      removeDataFromLocalStorage("cards");
      toast.warn(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
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
        toast.success(`Hello there ${user.nickname}`);
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
      .addCase(clearStore.rejected, () => {
        toast.error("ERROR");
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
