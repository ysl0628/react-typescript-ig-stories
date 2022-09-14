import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { setCurrentUser } from "../../../store/reducers/slideSlice";
import Modal from "../../Modal";

type ProfileProps = {
  index: number;
  id: string;
  username?: string;
  url: string;
  posts: string[];
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Profile({
  index,
  id,
  username,
  url,
  posts,
  setModalShow,
}: ProfileProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.slide.currentUserIndex);
  console.log(currentUser);

  return (
    <>
      <div
        id={id}
        className="content"
        onClick={() => {
          setModalShow((prev) => !prev);
          dispatch(setCurrentUser(index));
        }}
      >
        <img src={url} alt="" />
      </div>
      {/* {modalShow && (
        <Modal show={modalShow} close={setModalShow} posts={posts} />
      )} */}
    </>
  );
}
