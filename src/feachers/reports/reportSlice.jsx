import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
const initialState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  date: 1,
};

const reportSlice = createSlice({
  name: "report",
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
});
export const { handleChange, clearValues } = reportSlice.actions;
export default reportSlice.reducer;
