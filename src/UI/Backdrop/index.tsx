import React from "react";
import ReactDOM from "react-dom";

type BackdropProps = {
  children: React.ReactNode;
};

export default function Backdrop(props: BackdropProps) {
  return ReactDOM.createPortal(
    <div className="backdrop">{props.children}</div>,
    document.getElementById("backdrop-modal") as HTMLElement
  );
}
