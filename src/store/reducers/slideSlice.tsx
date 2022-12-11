import { createSlice } from '@reduxjs/toolkit'

export type Active = {
  currentIndex: number
  currentUserIndex: number
  playState: boolean
  rotateIndex: number
  carouselStyle: string
  clickTime: number | null
  pauseTime: number | null
}

const initialState: Active = {
  currentIndex: 0,
  currentUserIndex: 0,
  playState: true,
  rotateIndex: 0,
  carouselStyle: 'translateZ(-500px)',
  clickTime: null,
  pauseTime: null,
}

export const slideSlice = createSlice({
  name: 'slice',
  initialState: initialState,
  reducers: {
    init(state) {
      state.currentIndex = 0
      state.playState = true
    },
    nextSlide(state) {
      state.currentIndex += 1
    },
    prevSlide(state) {
      state.currentIndex -= 1
    },
    pause(state) {
      state.playState = false
      state.pauseTime = Date.now()
    },
    play(state, action) {
      state.playState = true
      state.clickTime = action ? Date.now() : null
      // state.pauseTime = null
    },
    setCurrentUser(state, action) {
      state.currentUserIndex = action.payload
    },
    setCarouselStyle(state, action) {
      state.carouselStyle = action.payload
    },
  },
})

export const {
  nextSlide,
  prevSlide,
  init,
  pause,
  play,
  setCurrentUser,
  setCarouselStyle,
} = slideSlice.actions
export default slideSlice.reducer
