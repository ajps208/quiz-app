import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: 'score',
  initialState: { score: 0, celebration: false },  reducers: {
    setScore: (state) => {
      state.score +=1 // Set the state to a new value
    },
    setReset:(state)=>{
      state.score=0
    },
    setCelbration:(state)=>{
      state.celebration=true
    },
    resetCelbration:(state)=>{
      state.celebration=false
    }
  }
});

export const { setScore,setReset,setCelbration,resetCelbration } = scoreSlice.actions;
export default scoreSlice.reducer;
