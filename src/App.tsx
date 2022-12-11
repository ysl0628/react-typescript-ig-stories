import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Post from './components/Post'
import { auth, db } from './firebase'
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import ImageUpload from './components/ImageUpload'
import { User } from 'firebase/auth'

let didInit = false

const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))

function App() {
  const [posts, setPosts] = useState<DocumentData[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!didInit) {
      didInit = true

      onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      })
    }
  }, [])

  const renderPosts = () => {
    return posts.map(({ post, id }) => (
      <Post
        key={id}
        username={post.username}
        caption={post.caption}
        imageUrl={post.imageUrl}
        postId={id}
        currentUser={user}
      />
    ))
  }

  return (
    <div className="App">
      <Header setUser={setUser} user={user} />
      <NavBar />
      {renderPosts()}
      {user && <ImageUpload username={auth.currentUser?.displayName || null} />}
    </div>
  )
}

export default App
