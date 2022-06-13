import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import db, { auth } from '../../app/firebase'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import { IRecipe, IUser } from '../../types'
import Recipes from '../../components/recipe/Recipes'
import { useNavigate } from 'react-router-dom'

const CollectionPageStyled = styled.div`
  h3 {
    margin: 0;
  }
`

const CollectionPage = () => {
  const [user, loadingUser, error] = useAuthState(auth)
  const [myRecipes, setMyRecipes] = useState<IRecipe[]>([])
  const [myCollection, setMyCollection] = useState<IRecipe[]>([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return navigate('/signin')

    const fetchCollection = async () => {
      const userRef = doc(db, 'users', user.uid)
      const snapshotUser = (await getDoc(userRef).then(d => d.data())) as IUser

      if (!snapshotUser.collection || !snapshotUser.collection.length)
        return setMyCollection([])

      const q = query(
        collection(db, 'recipes'),
        where('__name__', 'in', snapshotUser.collection)
      )
      const snapshotRecipes = await getDocs(q)
      const res = snapshotRecipes.docs.map(r => {
        return { ...r.data(), id: r.id }
      }) as IRecipe[]

      setMyCollection(res)
    }

    const fetchMyRecipes = async () => {
      const q = query(
        collection(db, 'recipes'),
        where('author', '==', user.uid)
      )
      const snapshot = await getDocs(q)
      const res = snapshot.docs.map(r => {
        return { ...r.data(), id: r.id }
      }) as IRecipe[]
      setMyRecipes(res)
    }

    fetchCollection()
      .then(() => fetchMyRecipes())
      .then(() => setLoading(false))
      .catch(err => console.log(err))
  }, [user])

  if (loading) return <Loading />

  return (
    <Layout>
      <CollectionPageStyled className="content">
        <h3>My Recipes</h3>
        <Recipes recipes={myRecipes} />
        <h3>My Collection</h3>
        <Recipes recipes={myCollection} />
      </CollectionPageStyled>
    </Layout>
  )
}

export default CollectionPage
