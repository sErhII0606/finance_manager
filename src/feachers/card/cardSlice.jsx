import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDataFromLocalStorage,
  addDataToLocalStorage,
  removeDataFromLocalStorage,
} from "../../util/localStorege";
import {
  addNewCardThunk,
  getUserCardsThunk,
  getCardByIdThunk,
  deleteCardThunk,
  updateCardThunk,
} from "./cardThunk";
import { toast } from "react-toastify";
const initialState = {
  cards: getDataFromLocalStorage("cards", []),
  deletedId: "",
  singleCard: {},
  cardId: "",
  cardName: "",
  bank: "",
  creditLine: 0,
  balance: 0,
  isLoading: false,
};

export const addNewCard = createAsyncThunk("card/addNewCard", addNewCardThunk);
export const updateCard = createAsyncThunk("card/updateCard", updateCardThunk);
export const deleteCard = createAsyncThunk("card/deleteCard", deleteCardThunk);
export const getUserCards = createAsyncThunk(
  "card/getUserCards",
  getUserCardsThunk
);
export const getCardById = createAsyncThunk(
  "card/getCardById",
  getCardByIdThunk
);

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: (state) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cards = [payload, ...getDataFromLocalStorage("cards", [])];
        addDataToLocalStorage("cards", [
          payload,
          ...getDataFromLocalStorage("cards", []),
        ]);
        toast.success(`new card added`);
      })
      .addCase(addNewCard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getUserCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCards.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cards = payload;
        addDataToLocalStorage("cards", payload);
      })
      .addCase(getUserCards.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getCardById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCardById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.singleCard = payload;
      })
      .addCase(getCardById.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.deletedId = payload;
        state.singleCard = {};
        addDataToLocalStorage(
          "cards",
          getDataFromLocalStorage("cards", []).filter(
            (card) => card.cardId !== payload
          )
        );
        toast.error("card deleted");
      })
      .addCase(deleteCard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.singleCard = payload;
        const card = getDataFromLocalStorage("cards", []).find(
          (c) => c.cardId === payload.cardId
        );
        addDataToLocalStorage("cards", [
          ...getDataFromLocalStorage("cards", []).filter(
            (c) => c.cardId !== payload.cardId
          ),
          { ...payload, userId: card.userId },
        ]);
        console.log(payload);
        toast.success("card edited");
      })
      .addCase(updateCard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const { handleChange, clearValues } = cardSlice.actions;
export default cardSlice.reducer;
