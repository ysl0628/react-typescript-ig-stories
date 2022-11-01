import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faPause,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
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
import "./carousel.css";

type ModalProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  posts: string[];
  imgUrl: string;
  username: string;
};
const cellCount = 4;
const theta = 360 / cellCount;

export default function Modal({ close, posts, imgUrl, username }: ModalProps) {
  const [clickTime, setClickTime] = useState<number>();
  const [pauseTime, setPauseTime] = useState<number>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const profiles = useProfile();
  const dispatch = useAppDispatch();
  const slide = useAppSelector((state) => state.slide);

  const carouselRef = useRef<null | HTMLDivElement>(null);
  const [carouselStyle, setCarouselStyle] =
    useState<string>("translateZ(-500px)");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const cellWidth = carouselRef.current?.offsetWidth;
  const cellHeight = carouselRef.current?.offsetHeight;
  const radius = Math.round(cellWidth! / 2 / Math.tan(Math.PI / cellCount));

  useEffect(() => {
    const angle = theta * selectedIndex * -1;
    setCarouselStyle(`translateZ(${-radius}px) rotateY(${angle}deg)`);
    console.log(angle);
    console.log(carouselStyle);
  }, [carouselStyle, radius, selectedIndex]);

  const prevHandler = () => {
    setSelectedIndex((prev) => prev - 1);
  };
  const nextHandler = () => {
    setSelectedIndex((prev) => prev + 1);
    console.log(carouselStyle);
  };

  // const prevHandler = () => {
  //   if (slide.currentIndex > 0) {
  //     return dispatch(prevSlide());
  //   }
  //   if (slide.currentUserIndex === 0) {
  //     return close(false);
  //   }
  //   dispatch(setCurrentUser(slide.currentUserIndex - 1));
  //   dispatch(init());
  // };

  // const nextHandler = useCallback(() => {
  //   let d = new Date();
  //   setClickTime(d.getMilliseconds());
  //   if (slide.currentIndex < posts.length - 1) {
  //     return dispatch(nextSlide());
  //   }
  //   if (slide.currentUserIndex === profiles.length - 1) {
  //     return dispatch(setCurrentUser(0)) && dispatch(init());
  //   }
  //   dispatch(setCurrentUser(slide.currentUserIndex + 1));
  //   dispatch(init());
  // }, [dispatch, posts.length, profiles.length, slide]);

  useEffect(() => {
    slide.playState
      ? (timerRef.current = setTimeout(
          nextHandler,
          clickTime && pauseTime ? 5000 - (pauseTime - clickTime) : 5000
        ))
      : clearTimeout(timerRef.current);
    return () => clearTimeout(timerRef.current);
  }, [clickTime, nextHandler, pauseTime, slide.playState]);

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
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="scene">
          <div
            className="carousel"
            ref={carouselRef}
            style={{ transform: carouselStyle }}
          >
            <div className="carousel__cell">
              <div className="slide-items">
                {posts.map((post, index) => (
                  <img
                    key={index}
                    src={post}
                    className={`${
                      index === slide.currentIndex ? "active" : ""
                    }`}
                    alt=""
                  />
                ))}
              </div>
            </div>
            <div className="carousel__cell">2</div>
            <div className="carousel__cell">3</div>
            <div className="carousel__cell">4</div>
            <nav
              onMouseDown={() => {
                let p = new Date();
                setPauseTime(p.getMilliseconds());
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
                {slide.playState ? (
                  <button>
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                ) : (
                  <button>
                    <FontAwesomeIcon icon={faPause} />
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
        <button id="prev" onClick={prevHandler} className="slide-prev">
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button id="next" onClick={nextHandler} className="slide-next">
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
    </Backdrop>
  );
}
