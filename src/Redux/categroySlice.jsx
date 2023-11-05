// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    difficulty: "",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    // setDifficulty: (state, action) => {
    //   state.difficulty = action.payload;
    // },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
