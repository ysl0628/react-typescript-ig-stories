import { User } from 'firebase/auth'
import { Dispatch, SetStateAction, useState } from 'react'
import { auth } from '../../firebase'
import './index.css'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'

const Header = ({
  user,
  setUser,
}: {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}) => {
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false)
  const [signInOpen, setSignInOpen] = useState<boolean>(false)

  const handleSignUpOpen = () => setSignUpOpen(true)
  const handleSignUpClose = () => setSignUpOpen(false)
  const handleSignInOpen = () => setSignInOpen(true)
  const handleSignInClose = () => setSignInOpen(false)
  const handleSignOut = async () => {
    console.log('logout')

    await auth.signOut()
    setUser(null)
  }
  const isLogin = auth.currentUser
  console.log('logout', auth.currentUser)

  return (
    <div className="header">
      <div className="headerImage">
        <img
          src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-instagram-new-logo-vector-download-5.png"
          width="30"
          alt="logo ig, instagram new logo vector download"
        />
      </div>
      <div className="signUp-btn">
        {isLogin ? (
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
        {!isLogin && <button onClick={handleSignInOpen}>Sign in</button>}
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
