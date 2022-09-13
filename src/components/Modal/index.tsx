import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { init, nextSlide, prevSlide } from "../../store/reducers/slideSlice";
import Backdrop from "../../UI/Backdrop";
import "./index.css";

type ModalProps = {
  show: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  posts: string[];
};

export default function Modal({ show, close, posts }: ModalProps) {
  const currentSlideIndex = useAppSelector(
    (state) => state.slide.activeSlideIndex
  );
  const dispatch = useAppDispatch();

  const prevHandler = () => {
    if (currentSlideIndex === 0) {
      return dispatch(init());
    }
    dispatch(prevSlide());
  };
  const nextHandler = useCallback(() => {
    if (currentSlideIndex < posts.length - 1) {
      return dispatch(nextSlide());
    }
    dispatch(init());
  }, [currentSlideIndex]);

  useEffect(() => {
    const timer = setTimeout(nextHandler, 5000);
    return () => clearTimeout(timer);
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
              className={`${index === currentSlideIndex ? "active" : ""}`}
              alt=""
            />
          ))}
        </div>
        <nav className="slide-nav">
          <div className="slide-thumb">
            {posts.map((_, index) => (
              <span
                key={index}
                className={`${index === currentSlideIndex ? "active" : ""} ${
                  index < currentSlideIndex ? "finished" : ""
                }`}
              ></span>
            ))}
          </div>
          <button onClick={prevHandler} className="slide-prev">
            prev
          </button>
          <button onClick={nextHandler} className="slide-next">
            next
          </button>
        </nav>
      </div>
    </Backdrop>
  );
}
