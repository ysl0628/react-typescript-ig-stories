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
            src="https://images.unsplash.com/photo-1661347335435-6d851eb110f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1661347335435-6d851eb110f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1661347335435-6d851eb110f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1661347335435-6d851eb110f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
          />
        </div>
        <nav className="slide-nav">
          <div className="slide-thumb">
            <span className="active"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <button className="slide-prev">prev</button>
          <button className="slide-next">next</button>
        </nav>
      </div>
    </Backdrop>
  );
}
