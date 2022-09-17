import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef } from "react";
import useProfile from "../../hooks/useProfile";
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
  imgUrl: string;
  username: string;
};

export default function Modal({ close, posts, imgUrl, username }: ModalProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const profiles = useProfile();
  const dispatch = useAppDispatch();
  const slide = useAppSelector((state) => state.slide);

  const prevHandler = () => {
    if (slide.currentIndex > 0) {
      return dispatch(prevSlide());
    }
    if (slide.currentUserIndex === 0) {
      return close(false);
    }
    dispatch(setCurrentUser(slide.currentUserIndex - 1));
    dispatch(init());
  };

  const nextHandler = useCallback(() => {
    if (slide.currentIndex < posts.length - 1) {
      return dispatch(nextSlide());
    }
    if (slide.currentUserIndex === profiles.length - 1) {
      return dispatch(setCurrentUser(0)) && dispatch(init());
    }
    dispatch(setCurrentUser(slide.currentUserIndex + 1));
    dispatch(init());
  }, [slide.currentIndex, slide.currentUserIndex]);

  useEffect(() => {
    slide.playState
      ? (timerRef.current = setTimeout(nextHandler, 5000))
      : clearTimeout(timerRef.current);
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
        <nav
          onMouseDown={() => {
            clearTimeout(timerRef.current);
            dispatch(pause());
          }}
          onMouseUp={() => {
            dispatch(play());
          }}
          className="slide-nav"
        >
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
          <div className="slide-userImage">
            <img src={imgUrl} alt="" />
          </div>
          <div className="slide-username">
            <p>{username}</p>
          </div>
          <button
            onClick={prevHandler}
            onMouseDown={() => {
              clearTimeout(timerRef.current);
              dispatch(pause());
            }}
            onMouseUp={() => {
              dispatch(play());
            }}
            className="slide-prev"
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} />
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
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </nav>
      </div>
    </Backdrop>
  );
}
