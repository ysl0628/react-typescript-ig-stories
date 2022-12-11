import { Avatar } from '@mui/material'
import './post.css'
import ava from '../../assets/img/profile1.jpg'
import {
  onSnapshot,
  DocumentData,
  updateDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { User } from 'firebase/auth'

// , orderBy('timestamp', 'desc')

// let isEffect = false
// const q = query(collection(db, 'posts'))
// const qu = doc(db, 'posts', 'comments')

const Post = ({
  currentUser,
  username,
  caption,
  imageUrl,
  postId,
}: {
  currentUser: User | null
  username: string
  caption: string
  imageUrl: string
  postId: string
}) => {
  const [comments, setComments] = useState<DocumentData>([])
  const [comment, setComment] = useState<string | undefined>()

  useEffect(() => {
    // const qu = query(
    //   collection(db, 'posts', postId, 'comments'),
    //   orderBy('timestamp', 'desc')
    // )

    // onSnapshot(qu, (snapshot) => {
    //   setComments(snapshot.docs.map((doc) => doc.data()))
    //   // const currentPost = snapshot.docs.filter((doc) => doc.id === postId)
    //   // setComments(currentPost[0].data().comments)
    // })

    onSnapshot(doc(db, 'posts', postId), (snapshot) => {
      setComments(snapshot.data()?.comments)
    })
  }, [postId])
  // e: MouseEventHandler<HTMLButtonElement>
  const postComment = () => {
    // e.preventDefault()
    updateDoc(doc(db, 'posts', postId), {
      comments: arrayUnion({
        text: comment,
        username: currentUser?.displayName,
        // timestamp: serverTimestamp(),
      }),
    }).catch((error) => console.log(error.message))
    // addDoc(collection(db, 'posts', postId, 'comments'), {
    //   text: comment,
    //   username: 'test',
    //   timestamp: serverTimestamp(),
    // }).catch((error) => console.log(error.message))

    setComment('')
  }

  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt={'username'} src={ava} />
        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt="" />
      <h4 className="post_text">
        <strong>{username} </strong>
        {caption}
      </h4>
      {comments && comments.length > 0 && (
        <div className="post_comments">
          {comments.map(
            (comment: { text: string; username: string }, index: number) => (
              <p key={comment.username + index}>
                <strong>{comment.username} </strong>
                {comment.text}
              </p>
            )
          )}
        </div>
      )}
      <div className="post_comments_box">
        <div className="form">
          <FontAwesomeIcon icon={faFaceSmile} />
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment....."
            value={comment ? comment : ''}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            // type='submit'
            disabled={!comment}
            onClick={postComment}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post
