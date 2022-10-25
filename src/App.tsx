import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "renee",
      caption: "so cool",
    },
    {
      username: "ysl",
      caption: "so cool cool",
    },
    {
      username: "mike",
      caption: "so cool cool cool",
    },
  ]);
  return (
    <div className="App">
      <Header />
      <NavBar />
      {posts.map((post, index) => (
        <Post key={index} username={post.username} caption={post.caption} />
      ))}
    </div>
  );
}

export default App;
