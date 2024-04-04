import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDataFromLocalStorage,
  addDataToLocalStorage,
  removeDataFromLocalStorage,
} from "../../util/localStorege";
import {
  addNewTransactionThunk,
  getUserTransactionsThunk,
  getTransactionByIdThunk,
  deleteTransactionThunk,
  getTransactionsByCardThunk,
} from "./transactionsThunk";
import { toast } from "react-toastify";
const initialState = {
  transactions: getDataFromLocalStorage("transactions", []),
  transactionByCard: [],
  deletedId: "",
  singleTransaction: {},
  transactionId: "",
  info: "",
  amount: "",
  createdAt: 0,
  cardName: "",
  cardId: "",
  bank: "",
  img: "",
  isLoading: false,
};

export const addNewTransaction = createAsyncThunk(
  "transaction/addNewTransaction",
  addNewTransactionThunk
);

export const getTransactionsByCard = createAsyncThunk(
  "transaction/getTransactionsByCard",
  getTransactionsByCardThunk
);
export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  deleteTransactionThunk
);
export const getUserTransactions = createAsyncThunk(
  "transaction/getUserTransactions",
  getUserTransactionsThunk
);
export const getTransactionById = createAsyncThunk(
  "transaction/getTransactionById",
  getTransactionByIdThunk
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValuesTransactions: (state) => {
      return {
        ...initialState,
      };
    },
    setBank: (state, { payload }) => {
      state.bank = payload;
    },

    setImg: (state, { payload }) => {
      state.img = payload;
    },
    setCardName: (state, { payload }) => {
      state.cardName = payload;
    },
    setInfo: (state, { payload }) => {
      state.info = payload;
    },
    setCardId: (state, { payload }) => {
      state.cardId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewTransaction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.transactions = [
          payload,
          ...getDataFromLocalStorage("transactions", []),
        ];
        addDataToLocalStorage("transactions", [
          payload,
          ...getDataFromLocalStorage("transactions", []),
        ]);
        toast.success(`new transaction added`);
      })
      .addCase(addNewTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.transactions = payload;
        addDataToLocalStorage("transactions", payload);
      })
      .addCase(getUserTransactions.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getTransactionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.singleTransaction = payload;
        //console.log(payload);
      })
      .addCase(getTransactionById.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getTransactionsByCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionsByCard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.transactionByCard = payload.Items;
        //console.log(payload);
      })
      .addCase(getTransactionsByCard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.singleTransaction = {};
        addDataToLocalStorage(
          "transactions",
          getDataFromLocalStorage("transactions", []).filter(
            (transaction) => transaction.transactionId !== payload
          )
        );
        toast.error("transaction deleted");

        state.deletedId = payload;
        //console.log(payload);
      })
      .addCase(deleteTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const {
  handleChange,
  setBank,
  setCardName,
  clearValuesTransactions,
  setImg,
  setInfo,
  setCardId,
} = transactionSlice.actions;
export default transactionSlice.reducer;
