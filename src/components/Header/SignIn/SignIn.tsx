import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth'
import {
  useState,
  MouseEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { auth } from '../../../firebase'
import Backdrop from '../../../UI/Backdrop'
import './signIn.css'

const SignIn = ({
  handleClose,
  user,
  setUser,
}: {
  handleClose: () => void
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}) => {
  const [username, setUsername] = useState<string | undefined>('')
  const [email, setEmail] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')
  // const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // 設置身份驗證狀態觀察者並獲取用戶數據
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user logged in
        console.log(authUser)
        setUser(authUser)
        if (authUser.displayName) {
          // don't update name
          return
        }
        if (auth.currentUser === null) return
        return updateProfile(auth.currentUser, {
          displayName: username,
        })
      }
      // user logged out
      setUser(null)
    })

    return () => {
      // perform some cleanup action
      unsubscribe()
    }
  }, [setUser, user, username])

  const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email || '', password || '').catch(
      (error) => alert(error.message)
    )
    // setUser(auth.currentUser)
    handleClose()
  }

  return (
    <Backdrop>
      <div className='wrapper' onClick={handleClose}>
        <div className='sign-up-content' onClick={(e) => e.stopPropagation()}>
          <div className='logo-img'>
            <img
              src='https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-instagram-new-logo-vector-download-5.png'
              alt=''
              width={'100%'}
            />
          </div>
          <form className='input-section'>
            <input
              type='text'
              placeholder='username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>

          <button type='submit' onClick={(e) => handleSignIn(e)}>
            Sign In
          </button>
        </div>
      </div>
    </Backdrop>
  )
}

export default SignIn
