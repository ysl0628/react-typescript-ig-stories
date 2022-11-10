import { Avatar } from "@mui/material";
import "./post.css";
import ava from "../../assets/img/profile1.jpg";

const Post = ({
  username,
  caption,
  imageUrl,
}: {
  username: string;
  caption: string;
  imageUrl: string;
}) => {
  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt={"username"} src={ava} />
        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt="" />
      <h4 className="post_text">
        <strong>{username}: </strong>
        {caption}
      </h4>
    </div>
  );
};

export default Post;
