import { useState } from "react";
import Modal from "../../Modal";

type ProfileProps = {
  id: string;
  username?: string;
  url: string;
};
export default function Profile(props: ProfileProps) {
  const [modalShow, setModalShow] = useState<boolean>(false);
  return (
    <>
      <div
        className="content"
        onClick={() => {
          setModalShow((prev) => !prev);
        }}
      >
        <img src={props.url} alt="" />
      </div>
      {modalShow && <Modal />}
    </>
  );
}
