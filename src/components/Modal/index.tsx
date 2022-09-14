import { useCallback, useEffect, useRef, useState } from "react";
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
  const [playState, setPlayState] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const dispatch = useAppDispatch();
  const currentSlideIndex = useAppSelector(
    (state) => state.slide.activeSlideIndex
  );

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
                } ${!playState && "pause"}`}
              ></span>
            ))}
          </div>
          <button onClick={prevHandler} className="slide-prev">
            prev
          </button>
          <button
            onClick={nextHandler}
            onMouseDown={() => {
              clearTimeout(timerRef.current);
              setPlayState(false);
            }}
            onMouseUp={() => {
              setPlayState(true);
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
