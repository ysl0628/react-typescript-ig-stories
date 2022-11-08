import { useAppDispatch } from "../../../hooks/useRedux";
import {
  setCarouselStyle,
  setCurrentUser,
  setRotate,
} from "../../../store/reducers/slideSlice";

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

  return (
    <>
      <div
        id={id}
        className="content"
        onClick={() => {
          setModalShow((prev) => !prev);
          dispatch(setCurrentUser(index));
          dispatch(setRotate(index));
          dispatch(setCarouselStyle("translateZ(-500px)"));
        }}
      >
        <img src={url} alt="" />
      </div>
    </>
  );
}
