import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: 'pageSlice',
  initialState: 'home', // Initial state as a string
  reducers: {
    setPage: (state, action) => {
      return action.payload; // Set the state to a new value
    }
  }
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
