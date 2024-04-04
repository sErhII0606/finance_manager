import { authHeader } from "../../util/authHeader";
import customFetch from "../../util/axios";

export const addNewTransactionThunk = async (transaction, thunkAPI) => {
  try {
    const resp = await customFetch.post(
      "/transaction",
      { id: `${new Date().getTime()}`, ...transaction },
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

export const getUserTransactionsThunk = async (userId, thunkAPI) => {
  try {
    const resp = await customFetch.get(
      `/transactions?userId=${userId}`,
      authHeader(thunkAPI)
    );
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getTransactionByIdThunk = async (transactionId, thunkAPI) => {
  try {
    const resp = await customFetch.get(
      `/transactions/${transactionId}`,
      authHeader(thunkAPI)
    );
    return resp.data[0];
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const deleteTransactionThunk = async (transactionId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(
      `/transaction/${transactionId}`,
      authHeader(thunkAPI)
    );
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getTransactionsByCardThunk = async (cardId, thunkAPI) => {
  try {
    const resp = await customFetch.get(
      `/transactions/sortingTransactionsByCard?cardId=${cardId}`,
      authHeader(thunkAPI)
    );
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
