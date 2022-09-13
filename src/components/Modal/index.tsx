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
  console.log(currentSlideIndex);
  const dispatch = useAppDispatch();

  const prevHandler = () => {
    console.log("按了 prev 按鈕");
    dispatch(prevSlide());
  };
  const nextHandler = () => {
    console.log("按了 next 按鈕");
    dispatch(nextSlide());
  };

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
          <button
            onClick={prevHandler}
            disabled={currentSlideIndex === 0}
            className="slide-prev"
          >
            prev
          </button>
          <button
            onClick={nextHandler}
            disabled={currentSlideIndex === posts.length - 1}
            className="slide-next"
          >
            next
          </button>
        </nav>
      </div>
    </Backdrop>
  );
}
