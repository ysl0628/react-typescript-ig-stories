import { User } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../../firebase'
import ImageUpload from '../ImageUpload'
import './index.css'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'

const Header = () => {
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false)
  const [signInOpen, setSignInOpen] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const handleSignUpOpen = () => setSignUpOpen(true)
  const handleSignUpClose = () => setSignUpOpen(false)
  const handleSignInOpen = () => setSignInOpen(true)
  const handleSignInClose = () => setSignInOpen(false)
  const handleSignOut = () => {
    auth.signOut()
    setUser(null)
  }
  console.log(user)

  return (
    <div className='header'>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Please login to upload</h3>
      )}
      <div className='headerImage'>
        <img
          src='https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-instagram-new-logo-vector-download-5.png'
          width='30'
          alt='logo ig, instagram new logo vector download'
        />
      </div>
      <div className='signUp-btn'>
        {user ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : (
          <button onClick={handleSignUpOpen}>Sign up</button>
        )}
        {signUpOpen && (
          <SignUp
            setUser={setUser}
            user={user}
            handleClose={handleSignUpClose}
          />
        )}
        {!user && <button onClick={handleSignInOpen}>Sign in</button>}
        {signInOpen && (
          <SignIn
            setUser={setUser}
            user={user}
            handleClose={handleSignInClose}
          />
        )}
      </div>
    </div>
  )
}

export default Header
