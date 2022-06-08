import { Link } from 'react-router-dom'
import Button from '../../components/button'
import Layout from '../../components/layout'

const NotFoundPage = () => {
  return (
    <Layout className="text-center">
      <h2>404</h2>
      <div style={{ marginBottom: '0.5rem' }}>
        The page you've requested doen't exist
      </div>
      <Link to="">
        <Button textColor="wheat" background="seaGreen" fontSize="1rem">
          Home
        </Button>
      </Link>
    </Layout>
  )
}

export default NotFoundPage
