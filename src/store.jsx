import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./feachers/card/cardSlice";
import userSlice from "./feachers/user/userSlice";
import transactionSlice from "./feachers/transactions/tansactionsSlice";

export const store = configureStore({
  reducer: {
    card: cardSlice,
    user: userSlice,
    transaction: transactionSlice,
  },
});
