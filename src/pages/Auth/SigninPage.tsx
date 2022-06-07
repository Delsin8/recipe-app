import Layout from '../../components/layout'
import AuthStyled from './AuthStyled'
import Button from '../../components/button'
import { signinWithEmailAndPassword } from '../../app/firebase'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { gradient } from '../../custom-data'

const SigninPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signin = () => {
    signinWithEmailAndPassword(email, password)
  }
  return (
    <Layout>
      <AuthStyled className="content">
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
        <div>
          <Button
            textColor="wheat"
            gradient={gradient}
            width="100%"
            fontSize="1rem"
            padding=".4rem 0"
            onClick={signin}
          >
            Login
          </Button>
        </div>
        <Link to="/signup" className="text-underline pointer fsize-negative-2">
          Don't have an account?
        </Link>
      </AuthStyled>
    </Layout>
  )
}

export default SigninPage
