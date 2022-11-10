import Backdrop from "../../../UI/Backdrop";
import "./signUp.css";

const SignUp = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Backdrop>
      <div className="wrapper" onClick={handleClose}>
        <div className="sign-up-content" onClick={(e) => e.stopPropagation()}>
          <div className="logo-img">
            <img
              src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-instagram-new-logo-vector-download-5.png"
              alt=""
              width={"100%"}
            />
          </div>
          <form className="input-section">
            <input type="text" placeholder="username" />
            <input type="text" placeholder="email" />
            <input type="text" placeholder="password" />
          </form>
          <button>Sign Up</button>
        </div>
      </div>
    </Backdrop>
  );
};

export default SignUp;
