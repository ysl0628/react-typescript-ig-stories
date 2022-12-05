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

let didInit = false

const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))

function App() {
  const [posts, setPosts] = useState<DocumentData[]>([])

  const isLogin = auth.currentUser

  useEffect(() => {
    if (!didInit) {
      console.log('render')

      didInit = true

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs[0].data())

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
      />
    ))
  }

  return (
    <div className='App'>
      <Header />
      <NavBar />
      {renderPosts()}
      {isLogin && (
        <ImageUpload username={auth.currentUser?.displayName || null} />
      )}
    </div>
  )
}

export default App
