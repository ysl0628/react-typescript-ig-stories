import { Avatar } from "@mui/material";
import "./post.css";
import ava from "../../assets/img/profile1.jpg";

const Post = ({ username, caption }: { username: string; caption: string }) => {
  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt={"username"} src={ava} />
        <h3>{username}</h3>
      </div>
      <img
        className="post_image"
        src="https://images.unsplash.com/photo-1666350773137-cbc310aaf909?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt=""
      />
      <h4 className="post_text">
        <strong>{username}:</strong>
        {caption}
      </h4>
    </div>
  );
};

export default Post;
