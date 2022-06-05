import Layout from '../../components/layout'
import AuthStyled from './AuthStyled'
import Button from '../../components/button'
import { signupWithEmailAndPassword } from '../../app/firebase'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const gradient =
  'linear-gradient(90deg, rgba(36,106,115,1) 0%, rgba(134,80,0,1) 100%)'

const SignupPage = () => {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signup = () => {
    // console.log(nickname)
    signupWithEmailAndPassword(nickname, email, password)
  }
  return (
    <Layout>
      <AuthStyled className="content">
        <div className="form-input flex align-center gap-small fsize-1 weight-light">
          <img src="/images/svg/user.svg" className="icon" />
          <input
            placeholder="Nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
        </div>
        <div className="form-input flex align-center gap-small fsize-3 weight-light">
          <img src="/images/svg/email.svg" className="icon" />
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-input flex align-center gap-small fsize-3 weight-light">
          <img src="/images/svg/password.svg" />
          <input
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-input flex align-center gap-small fsize-3 weight-light">
          <img src="/images/svg/password.svg" />
          <input placeholder="Repeat password" />
        </div>
        <div>
          <Button
            textColor="wheat"
            gradient={gradient}
            width="100%"
            fontSize="1rem"
            padding=".4rem 0"
            onClick={signup}
          >
            Register
          </Button>
        </div>
        <Link to="/signin" className="text-underline pointer fsize-negative-2">
          Already have an account?
        </Link>
      </AuthStyled>
    </Layout>
  )
}

export default SignupPage
