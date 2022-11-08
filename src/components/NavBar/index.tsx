import { useState } from "react";
import useProfile from "../../hooks/useProfile";
import { useAppSelector } from "../../hooks/useRedux";
import Modal from "../Modal";
import "./index.css";
import Profile from "./Profile";

export default function NavBar() {
  const profiles = useProfile();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const currentUser = useAppSelector((state) => state.slide.currentUserIndex);
  return (
    <div className="stories-container">
      {profiles.map((profile, index) => (
        <Profile
          index={index}
          key={profile.id}
          id={profile.id}
          url={profile.profileImg}
          posts={profile.posts as string[]}
          setModalShow={setModalShow}
        />
      ))}
      {modalShow && (
        <Modal
          key={profiles[currentUser].id}
          close={setModalShow}
          posts={profiles[currentUser].posts as string[]}
          imgUrl={profiles[currentUser].profileImg}
          username={profiles[currentUser].username}
          // modalShow={modalShow}
        />
      )}
    </div>
  );
}
