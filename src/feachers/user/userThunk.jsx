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

export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(
      "/user/updateUser",
      user,
      authHeader(thunkAPI)
    );
    console.log(user);
    return resp.data;
  } catch (error) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const clearStoreThunk = async (msg, thunkAPI) => {
  try {
    thunkAPI.dispatch(logout(msg));
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
