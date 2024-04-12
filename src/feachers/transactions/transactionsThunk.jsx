import { authHeader } from "../../util/authHeader";
import customFetch from "../../util/axios";
import { getUserTransactions } from "./tansactionsSlice";

export const addNewTransactionThunk = async (transaction, thunkAPI) => {
  try {
    const resp = await customFetch.post(
      "/transaction",
      { id: `${new Date().getTime()}`, ...transaction },
      authHeader(thunkAPI)
    );
    thunkAPI.dispatch(
      getUserTransactions({ userId: thunkAPI.getState().user.user.userId })
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getUserTransactionsThunk = async (
  { userId, dateStart, dateEnd },
  thunkAPI
) => {
  try {
    const resp = await customFetch.get(
      `/transactions?userId=${userId}`,
      authHeader(thunkAPI)
    );
    return { resp: resp.data, dateStart, dateEnd };
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

export const getTransactionsByCardThunk = async (
  { cardId, userId },
  thunkAPI
) => {
  try {
    const resp = await customFetch.get(
      `/transactions/sortingTransactionsByCard?cardId=${cardId}&userId=${userId}`,
      authHeader(thunkAPI)
    );
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const getTransactionsByCategoryThunk = async (
  { category, userId, dateStart, dateEnd },
  thunkAPI
) => {
  try {
    const resp = await customFetch.get(
      `/transactions/sortingTransactionsByCategory?info=${category}&userId=${userId}`,
      authHeader(thunkAPI)
    );
    return { resp: resp.data, dateStart, dateEnd };
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
