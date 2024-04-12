import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./feachers/card/cardSlice";
import userSlice from "./feachers/user/userSlice";
import transactionSlice from "./feachers/transactions/tansactionsSlice";
import reportSlice from "./feachers/reports/reportSlice";

export const store = configureStore({
  reducer: {
    card: cardSlice,
    report: reportSlice,
    user: userSlice,
    transaction: transactionSlice,
  },
});
