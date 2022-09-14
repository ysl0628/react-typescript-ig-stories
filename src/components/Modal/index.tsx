import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  init,
  nextSlide,
  pause,
  play,
  prevSlide,
  setCurrentUser,
} from "../../store/reducers/slideSlice";
import Backdrop from "../../UI/Backdrop";
import "./index.css";

type ModalProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  posts: string[];
};

export default function Modal({ close, posts }: ModalProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const dispatch = useAppDispatch();
  const slide = useAppSelector((state) => state.slide);

  const prevHandler = () => {
    if (slide.currentIndex > 0) {
      return dispatch(prevSlide());
    }
    if (slide.currentUserIndex === 0) {
      return dispatch(setCurrentUser(0));
    }
    dispatch(setCurrentUser(slide.currentUserIndex - 1));
    dispatch(init());
  };

  const nextHandler = useCallback(() => {
    if (slide.currentIndex < posts.length - 1) {
      return dispatch(nextSlide());
    }
    dispatch(setCurrentUser(slide.currentUserIndex + 1));
    dispatch(init());
  }, [slide.currentIndex, slide.currentUserIndex]);

  useEffect(() => {
    timerRef.current = setTimeout(nextHandler, 5000);
    return () => clearTimeout(timerRef.current);
  }, [nextHandler]);

  return (
    <Backdrop>
      <div data-slide="slide" className="slide">
        <button
          className="close-btn"
          onClick={() => {
            close(false);
            dispatch(init());
          }}
        >
          X
        </button>
        <div className="slide-items">
          {posts.map((post, index) => (
            <img
              key={index}
              src={post}
              className={`${index === slide.currentIndex ? "active" : ""}`}
              alt=""
            />
          ))}
        </div>
        <nav className="slide-nav">
          <div className="slide-thumb">
            {posts.map((_, index) => (
              <span
                key={index}
                className={`
                ${index === slide.currentIndex ? "active" : ""} 
                ${index < slide.currentIndex ? "finished" : ""} 
                ${!slide.playState ? "pause" : ""}
                `}
              ></span>
            ))}
          </div>
          <button
            onClick={prevHandler}
            onMouseDown={() => {
              dispatch(pause());
              clearTimeout(timerRef.current);
            }}
            onMouseUp={() => {
              dispatch(play());
            }}
            className="slide-prev"
          >
            prev
          </button>
          <button
            onClick={nextHandler}
            onMouseDown={() => {
              clearTimeout(timerRef.current);
              dispatch(pause());
            }}
            onMouseUp={() => {
              dispatch(play());
            }}
            className="slide-next"
          >
            next
          </button>
        </nav>
      </div>
    </Backdrop>
  );
}
