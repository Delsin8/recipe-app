import Layout from '../../components/layout'
import AuthStyled from './AuthStyled'
import { BsEnvelope } from 'react-icons/bs'
import { IoLockClosedOutline } from 'react-icons/io5'
import Button from '../../components/button'

const gradient =
  'linear-gradient(90deg, rgba(36,106,115,1) 0%, rgba(134,80,0,1) 100%)'

const SigninPage = () => {
  return (
    <Layout>
      <AuthStyled className="content">
        <div className="form-input flex align-center gap-small fsize-3 weight-light">
          <img src="/images/svg/email.svg" className="icon" />
          <input placeholder="Email" />
        </div>
        <div className="form-input flex align-center gap-small fsize-3 weight-light">
          <img src="/images/svg/password.svg" />
          {/* <IoLockClosedOutline className="icon" /> */}
          <input placeholder="Password" />
        </div>
        <div>
          <Button
            textColor="wheat"
            gradient={gradient}
            width="100%"
            fontSize="1rem"
            padding=".4rem 0"
          >
            Login
          </Button>
        </div>
        <div className="text-underline pointer fsize-negative-2">
          Don't have an account?
        </div>
      </AuthStyled>
    </Layout>
  )
}

export default SigninPage
