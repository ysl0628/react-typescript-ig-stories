import { createSlice } from "@reduxjs/toolkit";

type Active = {
  currentIndex: number;
  currentUserIndex: number;
  playState: boolean;
};

const initialState: Active = {
  currentIndex: 0,
  currentUserIndex: 0,
  playState: true,
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
  },
});

export const { nextSlide, prevSlide, init, pause, play, setCurrentUser } =
  slideSlice.actions;
export default slideSlice.reducer;
