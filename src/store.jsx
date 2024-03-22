import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./feachers/card/cardSlice";
import userSlice from "./feachers/user/userSlice";

export const store = configureStore({
  reducer: {
    card: cardSlice,
    user: userSlice,
  },
});
