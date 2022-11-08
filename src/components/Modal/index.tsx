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
  setCarouselStyle,
  setCurrentUser,
  setRotate,
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

export default function Modal({ close, posts, imgUrl, username }: ModalProps) {
  const [clickTime, setClickTime] = useState<number>();
  const [pauseTime, setPauseTime] = useState<number>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const profiles = useProfile();
  const dispatch = useAppDispatch();
  const slide = useAppSelector((state) => state.slide);
  // const angle = theta * slide.rotateIndex * -1;
  const carouselRef = useRef<null | HTMLDivElement>(null);
  const cellWidth = carouselRef.current?.offsetWidth;
  // const radius = Math.round(cellWidth! / 2 / Math.tan(Math.PI / cellCount));

  useEffect(() => {
    const radius = Math.round(cellWidth! / 2 / Math.tan(Math.PI / cellCount));
    dispatch(setCarouselStyle(`translateZ(${-radius}px)`));
  }, [cellWidth, dispatch]);
  // rotateY(${angle}deg)

  const prevHandler = () => {
    if (slide.currentIndex > 0) return dispatch(prevSlide());
    if (slide.currentUserIndex === 0) {
      close(false);
      dispatch(init());
    }
    if (slide.rotateIndex === 0) return dispatch(setRotate(0));
    dispatch(setCarouselStyle(`translateZ(-110px) rotateY(-120deg)`));
    dispatch(setRotate(slide.currentUserIndex - 1));
    dispatch(setCurrentUser(slide.currentUserIndex - 1));
    dispatch(init());
  };

  const nextHandler = useCallback(() => {
    // let d = new Date();
    // setClickTime(d.getMilliseconds());
    if (slide.currentIndex < profiles[slide.currentUserIndex].posts.length - 1)
      return dispatch(nextSlide());

    if (slide.currentUserIndex === profiles.length - 1) {
      return dispatch(setCurrentUser(0)) && dispatch(init());
    }

    dispatch(setRotate(slide.currentUserIndex + 1));
    dispatch(setCurrentUser(slide.currentUserIndex + 1));
    dispatch(setCarouselStyle(`translateZ(-110px) rotateY(120deg)`));

    dispatch(init());
  }, [dispatch, profiles, slide.currentIndex, slide.currentUserIndex]);

  useEffect(() => {
    slide.playState
      ? (timerRef.current = setTimeout(
          nextHandler,
          clickTime && pauseTime ? 5000 - (pauseTime - clickTime) : 5000
        ))
      : clearTimeout(timerRef.current);
    return () => clearTimeout(timerRef.current);
  }, [clickTime, nextHandler, pauseTime, posts.length, slide.playState]);

  return (
    <Backdrop>
      <div data-slide="slide" className="slide">
        <button
          className="close-btn"
          onClick={() => {
            close(false);
            dispatch(init());
            dispatch(setCarouselStyle("translateZ(-500px)"));
            // dispatch(setRotate(0));
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="scene">
          <div
            className="carousel"
            ref={carouselRef}
            style={{ transform: slide.carouselStyle }}
          >
            <div className="carousel__cell">
              <div className="slide-items">
                {profiles[slide.currentUserIndex].posts.map((post, index) => (
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
                  {profiles[slide.currentUserIndex].posts.map((_, index) => (
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
                  <img
                    src={profiles[slide.currentUserIndex].profileImg}
                    alt=""
                  />
                </div>
                <div className="slide-username">
                  <p>{profiles[slide.currentUserIndex].username}</p>
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
              <div className="slide-items">
                {profiles[slide.currentUserIndex].posts.map((post, index) => (
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
                  {profiles[slide.currentUserIndex].posts.map((_, index) => (
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
                  <img
                    src={profiles[slide.currentUserIndex].profileImg}
                    alt=""
                  />
                </div>
                <div className="slide-username">
                  <p>{profiles[slide.currentUserIndex].username}</p>
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
              {slide.currentUserIndex && (
                <>
                  <div className="slide-items">
                    {profiles[slide.currentUserIndex].posts.map(
                      (post, index) => (
                        <img
                          key={index}
                          src={post}
                          className={`${
                            index === slide.currentIndex ? "active" : ""
                          }`}
                          alt=""
                        />
                      )
                    )}
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
                      {profiles[slide.currentUserIndex].posts.map(
                        (_, index) => (
                          <span
                            key={index}
                            className={`
                ${index === slide.currentIndex ? "active" : ""} 
                ${index < slide.currentIndex ? "finished" : ""} 
                ${!slide.playState ? "pause" : ""}
                `}
                          ></span>
                        )
                      )}
                    </div>
                    <div className="slide-userImage">
                      <img
                        src={profiles[slide.currentUserIndex].profileImg}
                        alt=""
                      />
                    </div>
                    <div className="slide-username">
                      <p>{profiles[slide.currentUserIndex].username}</p>
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
