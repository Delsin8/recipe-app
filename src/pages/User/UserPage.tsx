import styled from 'styled-components'
import Layout from '../../components/layout'
import Button from '../../components/button'
import { useAuthState } from 'react-firebase-hooks/auth'
import db, {
  auth,
  createActivity,
  fetchUser,
  getAmountOfRecipes,
  subscribeToUser,
  uploadImage,
} from '../../app/firebase'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IUser } from '../../types'
import Loading from '../../components/loading'
import { doc, onSnapshot } from 'firebase/firestore'
import { notifyFailure } from '../../components/toast'

const UserPageStyled = styled.div`
  .photo {
    position: relative;
    height: 84px;
    width: 84px;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }

  .info-section {
    justify-content: space-around;

    input {
      //
      width: 35%;
      //
      background: none;
      border: none;
      font-size: 1.25rem;
    }
  }

  h3 {
    margin: 0 0 0.25rem 0;
  }
`

const UserPage = () => {
  const [user, setUser] = useState<IUser>()
  const [recipesAmount, setRecipesAmount] = useState<number>()
  const [loading, setLoading] = useState(true)
  const [authUser, loadingAuthUser, error] = useAuthState(auth)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!id || loadingAuthUser) return

    const userRef = doc(db, 'users', id)
    const unsubscribe = () =>
      onSnapshot(userRef, snap => {
        getAmountOfRecipes(snap?.ref).then(r => setRecipesAmount(r))
        setUser(snap?.data() as IUser)
        setLoading(false)
      })

    return unsubscribe()
  }, [loadingAuthUser, id])

  const subscribe = () => {
    if (!authUser) return navigate('/signin')
    id &&
      subscribeToUser(id).then(() => {
        !isSubscribed && createActivity('subscribe', id)
      })
  }

  const doesBelongToCurrentUser = authUser?.uid === user?.id
  const isSubscribed =
    authUser?.uid && user?.subscribers?.find(s => s.id === authUser.uid)

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadImage(e.currentTarget.files).catch((err: Error) =>
      notifyFailure(err.message)
    )
  }

  if (loading) return <Loading />

  return (
    <Layout>
      <UserPageStyled className="content">
        <div className="flex gap-small">
          <div className="photo">
            <img src={user?.photoURL} />
          </div>
          <div className="info-section flex direction-column">
            <div className="flex align-end">
              <div className="fsize-2 weight-medium">{user?.name}</div>
            </div>
            <div>
              <div>Recipes: {recipesAmount || 0}</div>
              <div>Subscribers: {user?.subscribers?.length || 0}</div>
            </div>
          </div>
        </div>
        {/* recipes */}
        <div>
          <h3 className="inline-block frame">Featured recipes</h3>
          {/* <Recipes recipes={[{ name: 'd' },/ { name: 'd' }, { name: 'd' }]} /> */}
        </div>
        <div>
          <h3 className="inline-block frame">Last added to collection</h3>
          {/* <Recipes recipes={[{ name: 'd' }]} /> */}
        </div>
        <div className="flex justify-center gap-small">
          {!doesBelongToCurrentUser && (
            <Button
              textColor="wheat"
              background="darkPurple"
              width="50%"
              fontSize="1rem"
              padding=".3 rem 0"
              onClick={subscribe}
            >
              {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          )}
        </div>
        {doesBelongToCurrentUser && (
          <div>
            <h5>Upload image</h5>
            <input
              type="file"
              accept="image/*"
              placeholder="Upload picture"
              onChange={handleUploadImage}
            />
          </div>
        )}
      </UserPageStyled>
    </Layout>
  )
}

export default UserPage
