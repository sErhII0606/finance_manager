import { authHeader } from "../../util/authHeader";
import customFetch from "../../util/axios";
import { clearValues } from "../card/cardSlice";
import { loginUser, logout } from "./userSlice";
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
    const resp = await customFetch.post("/user/login", user);
    console.log(user);
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
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
