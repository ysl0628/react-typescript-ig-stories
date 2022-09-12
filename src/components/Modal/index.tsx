import Backdrop from "../../UI/Backdrop";
import "./index.css";

type ModalProps = {
  show: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ show, close }: ModalProps) {
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
          <img
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
            alt=""
          />
          <img src="./img/img5.jpg" alt="" />
          <img src="./img/img6.jpg" alt="" />
          <img src="./img/img7.jpg" alt="" />
        </div>
        <nav className="slide-nav">
          <div className="slide-thumb"></div>
          <button className="slide-prev">prev</button>
          <button className="slide-next">next</button>
        </nav>
      </div>
    </Backdrop>
  );
}
