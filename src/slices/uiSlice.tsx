import { createSlice } from "@reduxjs/toolkit";
type InitialState = {
  theme: string;
};
const initialState: InitialState = {
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state: { theme: string }) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
