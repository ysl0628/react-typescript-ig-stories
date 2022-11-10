import { useState } from "react";
import "./index.css";
import SignUp from "./SignUp/SignUp";

const Header = () => {
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false);
  const handleClick = () => setSignUpOpen(true);
  const handleClose = () => setSignUpOpen(false);
  return (
    <div className="header">
      <div className="headerImage">
        <img
          src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-instagram-new-logo-vector-download-5.png"
          width="30"
          alt="logo ig, instagram new logo vector download"
        />
      </div>
      <div className="signUp-btn">
        <button onClick={handleClick}>Sign up</button>
        {signUpOpen && <SignUp handleClose={handleClose} />}
      </div>
    </div>
  );
};

export default Header;
