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
const cellCount = 3;
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

  const [nowIndex, setNowIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>();
  const [prevIndex, setPrevIndex] = useState<number>();

  const nextUser = useCallback(
    (i: number) => {
      if (nextIndex && nextIndex > profiles.length - 1) return 0;
      return i + 1;
    },
    [nextIndex, profiles.length]
  );

  useEffect(() => {
    const angle = theta * selectedIndex * -1;
    setCarouselStyle(`translateZ(${-radius}px) rotateY(${angle}deg)`);
  }, [carouselStyle, radius, selectedIndex]);

  const prevHandler = () => {
    if (slide.currentIndex > 0) return dispatch(prevSlide());

    // if (slide.currentUserIndex === 0) {
    //   return close(false);
    // }
    setSelectedIndex((prev) => prev - 1);
    // dispatch(setCurrentUser(slide.currentUserIndex - 1));
    dispatch(init());
  };

  const nextHandler = useCallback(() => {
    let d = new Date();
    setClickTime(d.getMilliseconds());
    if (slide.currentIndex < profiles[nowIndex].posts.length - 1)
      return dispatch(nextSlide());

    // if (slide.currentUserIndex === profiles.length - 1) {
    //   return dispatch(setCurrentUser(0)) && dispatch(init());
    // }
    setSelectedIndex((prev) => prev + 1);
    setNowIndex((prev) => prev + 1);
    setNextIndex(nextUser(nowIndex));
    dispatch(init());
    // dispatch(setCurrentUser(slide.currentUserIndex + 1));
    // dispatch(init());
  }, [dispatch, nextUser, nowIndex, profiles, slide.currentIndex]);

  // useEffect(() => {
  //   slide.playState
  //     ? (timerRef.current = setTimeout(
  //         nextHandler,
  //         clickTime && pauseTime ? 5000 - (pauseTime - clickTime) : 5000
  //       ))
  //     : clearTimeout(timerRef.current);
  //   return () => clearTimeout(timerRef.current);
  // }, [clickTime, nextHandler, pauseTime, posts.length, slide.playState]);

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
                {profiles[nowIndex].posts.map((post, index) => (
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
                  {profiles[nowIndex].posts.map((_, index) => (
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
                  <img src={profiles[nowIndex].profileImg} alt="" />
                </div>
                <div className="slide-username">
                  <p>{profiles[nowIndex].username}</p>
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
            <div className="carousel__cell">
              {nextIndex && (
                <>
                  <div className="slide-items">
                    {profiles[nextIndex].posts.map((post, index) => (
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
                      {profiles[nextIndex].posts.map((_, index) => (
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
                      <img src={profiles[nextIndex].profileImg} alt="" />
                    </div>
                    <div className="slide-username">
                      <p>{profiles[nextIndex].username}</p>
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
                </>
              )}
            </div>
            <div className="carousel__cell">3</div>
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
