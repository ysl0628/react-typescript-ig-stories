import Backdrop from "../../UI/Backdrop";
import "./index.css";

type ModalProps = {
  show: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  posts: string[];
};

export default function Modal({ show, close, posts }: ModalProps) {
  const prevHandler = () => {
    console.log("按了 prev 按鈕");
  };
  const nextHandler = () => {
    console.log("按了 next 按鈕");
  };

  return (
    <Backdrop>
      <div data-slide="slide" className="slide">
        <button
          className="close-btn"
          onClick={() => {
            close(false);
          }}
        >
          X
        </button>
        <div className="slide-items">
          {posts.map((post, index) => (
            <img key={index} src={post} alt="" />
          ))}
        </div>
        <nav className="slide-nav">
          <div className="slide-thumb">
            {posts.map((index) => (
              <span key={index}></span>
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
