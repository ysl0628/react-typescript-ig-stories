import { createSlice } from "@reduxjs/toolkit";

export type Active = {
  currentIndex: number;
  currentUserIndex: number;
  playState: boolean;
  rotateIndex: number;
  carouselStyle: string;
};

const initialState: Active = {
  currentIndex: 0,
  currentUserIndex: 0,
  playState: true,
  rotateIndex: 0,
  carouselStyle: "translateZ(-500px)",
};

export const slideSlice = createSlice({
  name: "slice",
  initialState: initialState,
  reducers: {
    init(state) {
      state.currentIndex = 0;
      state.playState = true;
    },
    nextSlide(state) {
      state.currentIndex += 1;
    },
    prevSlide(state) {
      state.currentIndex -= 1;
    },
    pause(state) {
      state.playState = false;
    },
    play(state) {
      state.playState = true;
    },
    setCurrentUser(state, action) {
      state.currentUserIndex = action.payload;
    },
    setRotate(state, action) {
      state.rotateIndex = action.payload;
    },
    setCarouselStyle(state, action) {
      state.carouselStyle = action.payload;
    },
  },
});

export const {
  nextSlide,
  prevSlide,
  init,
  pause,
  play,
  setCurrentUser,
  setCarouselStyle,
  setRotate,
} = slideSlice.actions;
export default slideSlice.reducer;
