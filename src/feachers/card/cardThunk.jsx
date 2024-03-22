import { authHeader } from "../../util/authHeader";
import customFetch from "../../util/axios";

export const addNewCardThunk = async (card, thunkAPI) => {
  try {
    const resp = await customFetch.post(
      "/card",
      { id: `card${new Date().getTime()}`, ...card },
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

export const getUserCardsThunk = async (userId, thunkAPI) => {
  try {
    const resp = await customFetch.get(
      `/cards?userId=${userId}`,
      authHeader(thunkAPI)
    );
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getCardByIdThunk = async (cardId, thunkAPI) => {
  try {
    const resp = await customFetch.get(
      `/cards/${cardId}`,
      authHeader(thunkAPI)
    );
    return resp.data[0];
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const updateCardThunk = async (card, thunkAPI) => {
  const { bank, cardName, creditLine, balance, cardId } = card;
  try {
    const resp = await customFetch.put(
      `/card/${cardId}`,
      { bank, cardName, creditLine, balance },
      authHeader(thunkAPI)
    );
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const deleteCardThunk = async (cardId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(
      `/card/${cardId}`,
      authHeader(thunkAPI)
    );
    return resp.data;
  } catch (error) {
    //  toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
