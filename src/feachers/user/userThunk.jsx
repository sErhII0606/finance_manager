import { authHeader } from "../../util/authHeader";
import customFetch from "../../util/axios";
import { clearValues } from "../card/cardSlice";
import { clearValuesTransactions } from "../transactions/tansactionsSlice";
import { getUserCashBalance, loginUser, logout } from "./userSlice";
export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/user/register", user);
    thunkAPI.dispatch(
      loginUser({ email: resp.data.email, password: resp.data.password })
    );
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updatePasswordThunk = async (password, thunkAPI) => {
  try {
    const resp = await customFetch.post(
      `/user/changePassword`,
      password,
      authHeader(thunkAPI)
    ); /* 
    console.log(resp.data.Value);
    const userId = resp.data.Value;
    thunkAPI.dispatch(getUserCashBalance(userId)); */
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const verifyEmailThunk = async (email, thunkAPI) => {
  try {
    const resp = await customFetch.post(
      `/verifyEmail`,
      { email },
      authHeader(thunkAPI)
    ); /* 
    console.log(resp.data.Value);
    const userId = resp.data.Value;
    thunkAPI.dispatch(getUserCashBalance(userId)); */
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const receiveReportThunk = async (email, thunkAPI) => {
  try {
    const resp = await customFetch.post(
      `/emailReport`,
      email,
      authHeader(thunkAPI)
    ); /* 
    console.log(resp.data.Value);
    const userId = resp.data.Value;
    thunkAPI.dispatch(getUserCashBalance(userId)); */
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const updateNicknameThunk = async (
  { AccessToken, newNickname },
  thunkAPI
) => {
  try {
    const resp = await customFetch.post(
      `/user/updateNickname`,
      { AccessToken, newNickname },
      authHeader(thunkAPI)
    ); /* 
    console.log(resp.data.Value);
    const userId = resp.data.Value;
    thunkAPI.dispatch(getUserCashBalance(userId)); */
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const logoutThunk = async (AccessToken, thunkAPI) => {
  try {
    const resp = await customFetch.post(
      `/user/signOut`,
      { AccessToken },
      authHeader(thunkAPI)
    ); /* 
    console.log(resp.data.Value);
    const userId = resp.data.Value;
    thunkAPI.dispatch(getUserCashBalance(userId)); */
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const deleteUserThunk = async ({ accessToken, userId }, thunkAPI) => {
  try {
    const resp = await customFetch.delete(
      `/user/deleteUser?AccessToken=${accessToken}&userId=${userId}`,
      authHeader(thunkAPI)
    ); /* 
    console.log(resp.data.Value);
    const userId = resp.data.Value;
    thunkAPI.dispatch(getUserCashBalance(userId)); */
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/user/login", user); /* 
    console.log(resp.data.Value);
    const userId = resp.data.Value;
    thunkAPI.dispatch(getUserCashBalance(userId)); */
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const clearStoreThunk = async (AccessToken, thunkAPI) => {
  try {
    thunkAPI.dispatch(logout(AccessToken));
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(clearValuesTransactions());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};

export const addUserCashBalanceThunk = async (
  { userId, balance },
  thunkAPI
) => {
  try {
    const resp = await customFetch.post(
      "/user/cash",
      { userId, balance },
      authHeader(thunkAPI)
    );
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getUserCashBalanceThunk = async (userId, thunkAPI) => {
  try {
    const resp = await customFetch.get(
      `/user/cash/${userId}`,
      authHeader(thunkAPI)
    );
    return resp.data[0];
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const updateUserCashBalanceThunk = async (
  { userId, balance },
  thunkAPI
) => {
  try {
    const resp = await customFetch.put(
      `/user/cash/${userId}`,
      { balance },
      authHeader(thunkAPI)
    );
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
