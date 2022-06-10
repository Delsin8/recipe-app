import styled from 'styled-components'
import Layout from '../../components/layout'
import Button from '../../components/button'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  auth,
  createActivity,
  fetchUser,
  getAmountOfRecipes,
  subscribeToUser,
} from '../../app/firebase'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IUser } from '../../types'

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

    .upload-picture {
      position: absolute;
      left: 50%;
      bottom: 1rem;
      transform: translate(-50%, 0);

      font-size: 0.6rem;
      background-color: ${({ theme }) => theme.colors.tan};
      padding: 2px;
      white-space: nowrap;
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

  useEffect(() => {
    if (!id || loadingAuthUser) return

    fetchUser(id)
      .then(res => {
        getAmountOfRecipes(res?.ref).then(r => setRecipesAmount(r))
        setUser(res?.data() as IUser)
      })
      .then(() => setLoading(false))
  }, [loadingAuthUser])

  const subscribe = () => {
    id && subscribeToUser(id).then(() => createActivity('subscribe', id))
  }

  const doesBelongToCurrentUser = authUser?.uid === user?.id

  if (loading) return <div>Loading</div>
  // load correct amount of recipes/subscribers
  return (
    <Layout>
      <UserPageStyled className="content">
        <div className="flex gap-small">
          <div className="photo">
            <img src={user?.photoURL} />
            <div className="upload-picture">Upload picture</div>
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
              Subscribe
            </Button>
          )}
          <Button
            textColor="wheat"
            background="teal"
            width="50%"
            fontSize="1rem"
            padding=".3 rem 0"
          >
            All recipes
          </Button>
        </div>
      </UserPageStyled>
    </Layout>
  )
}

export default UserPage
