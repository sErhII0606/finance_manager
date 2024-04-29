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
  clearStoreThunk,
  addUserCashBalanceThunk,
  updateUserCashBalanceThunk,
  getUserCashBalanceThunk,
  deleteUserThunk,
  updatePasswordThunk,
  updateNicknameThunk,
  logoutThunk,
  verifyEmailThunk,
  receiveReportThunk,
} from "./userThunk";
const initialState = {
  isLoading: false,
  isReportLoading: false,
  user: getDataFromLocalStorage("user", null),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  registerUserThunk
);
export const loginUser = createAsyncThunk("user/loginUser", loginUserThunk);
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  updatePasswordThunk
);
export const updateNickname = createAsyncThunk(
  "user/updateNickname",
  updateNicknameThunk
);
export const deleteUser = createAsyncThunk("user/deleteUser", deleteUserThunk);
export const receiveReport = createAsyncThunk(
  "user/receiveReport",
  receiveReportThunk
);
export const logout = createAsyncThunk("user/logout", logoutThunk);
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  verifyEmailThunk
);
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
  updatePasswordModal: false,
  initialState,
  reducers: {
    /* logout: (state, { payload }) => {
      state.user = null;
      removeDataFromLocalStorage("user");
      removeDataFromLocalStorage("cards");
      removeDataFromLocalStorage("transactions");
      toast.warn(payload);
    }, */
    setBalance: (state, { payload }) => {
      state.balance = payload;
    },

    setUpdatePasswordModal: (state, { payload }) => {
      state.updatePasswordModal = payload;
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
          userId: user.Value,
          //refreshToken: user.AuthenticationResult.RefreshToken,
          // idToken: user.AuthenticationResult.IdToken,
          accessToken: user.AuthenticationResult.AccessToken,
        };
        addDataToLocalStorage("user", {
          nickname: user.nickname,
          email: user.email,
          userId: user.Value,
          //refreshToken: user.AuthenticationResult.RefreshToken,
          // idToken: user.AuthenticationResult.IdToken,
          accessToken: user.AuthenticationResult.AccessToken,
        });
        toast.success(`Welcome back ${user.nickname}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(payload);
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.updatePasswordModal = false;
        state.isLoading = false;
        toast.success(payload.message);
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(payload);
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.message);
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(payload);
      })
      .addCase(receiveReport.pending, (state) => {
        state.isReportLoading = true;
      })
      .addCase(receiveReport.fulfilled, (state, { payload }) => {
        state.isReportLoading = false;
        toast.success(payload.message);
      })
      .addCase(receiveReport.rejected, (state, { payload }) => {
        state.isReportLoading = false;

        toast.error(payload);
      })
      .addCase(updateNickname.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNickname.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.nickname = payload.newNickname;
        addDataToLocalStorage("user", {
          ...getDataFromLocalStorage("user", null),
          nickname: payload.newNickname,
        });
        toast.success(payload.message);
      })
      .addCase(updateNickname.rejected, (state, { payload }) => {
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
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        removeDataFromLocalStorage("user");
        toast.warn(payload.message);
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        removeDataFromLocalStorage("user");
        removeDataFromLocalStorage("cards");

        toast.warn(payload.message);
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("ERROR");
      });
  },
});
export const { setBalance, setUpdatePasswordModal } = userSlice.actions;
export default userSlice.reducer;
