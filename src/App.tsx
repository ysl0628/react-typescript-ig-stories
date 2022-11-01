import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Post from "./components/Post";
import { db } from "./firebase";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
} from "firebase/firestore";

function App() {
  const [posts, setPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    onSnapshot(q, (snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
    );
  }, []);

  return (
    <div className="App">
      <Header />
      <NavBar />
      {posts.map(({ post, id }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
