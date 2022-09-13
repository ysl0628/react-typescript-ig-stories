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
    init(state) {
      state.activeSlideIndex = 0;
    },
    nextSlide(state) {
      state.activeSlideIndex += 1;
    },
    prevSlide(state) {
      state.activeSlideIndex -= 1;
    },
  },
});

export const { nextSlide, prevSlide, init } = slideSlice.actions;
export default slideSlice.reducer;
