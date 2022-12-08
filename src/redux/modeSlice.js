import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  night: false,
};

export const counterSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.night = !state.night;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeMode } = counterSlice.actions;

export default counterSlice.reducer;
