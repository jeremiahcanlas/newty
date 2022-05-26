import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTime: (state, action) => {
      return action.payload;
    },
    removeTime: () => {
      return initialState;
    },
    default: () => {
      return initialState;
    },
  },
});

export const { setTime, removeTime } = timeSlice.actions;

export default timeSlice.reducer;
