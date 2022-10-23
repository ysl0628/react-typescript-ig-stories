import { Avatar } from "@mui/material";
import "./post.css";
import ava from "../../assets/img/profile1.jpg";

const Post = () => {
  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt={"username"} src={ava} />
        <h3>username</h3>
      </div>
      <img
        className="post_image"
        src="https://images.unsplash.com/photo-1666350773137-cbc310aaf909?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt=""
      />
      <h4 className="post_text">
        <strong>reneelan:</strong> Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Qui iure tempore culpa molestiae quo. Maxime
        perspiciatis tempore ad alias sequi ab tenetur, quaerat commodi eius
        quisquam dolor aut dolorum quod?
      </h4>
    </div>
  );
};

export default Post;
