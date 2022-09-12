import { createSlice } from "@reduxjs/toolkit";

type Active = {
  activeSlideIndex: number;
};

const initialState: Active = {
  activeSlideIndex: 0,
};

export const slideSlice = createSlice({
  name: "slice",
  initialState: initialState,
  reducers: {
    nextSlide(state) {
      state.activeSlideIndex += 1;
    },
    prevSlide(state) {
      state.activeSlideIndex -= 1;
    },
  },
});

export const { nextSlide, prevSlide } = slideSlice.actions;
export default slideSlice.reducer;
