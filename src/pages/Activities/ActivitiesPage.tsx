import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, fetchActivities, markActivities } from '../../app/firebase'
import Layout from '../../components/layout'
import Activity from '../../features/activity'
import { IActivity } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import Loading from '../../components/loading'

const ActivitiesPageStyled = styled.div`
  margin: 0 auto;

  .profile-picture {
    flex-shrink: 0;
    width: 48px;
    height: 48px;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }

  @media (min-width: 768px) {
    width: 80%;
  }
`

const ActivitiesPage = () => {
  const [user, loadingUser, error] = useAuthState(auth)
  const [activities, setActivities] = useState<IActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    fetchActivities(user.uid)
      .then(result => {
        setActivities(result)
        setLoading(false)
      })
      .then(() => markActivities(user.uid))
      .catch(err => console.log(err))
  }, [user])

  if (loading) return <Loading />

  return (
    <Layout>
      <ActivitiesPageStyled className="content">
        {activities.map(a => (
          <Activity key={uuidv4()} {...a} userImg={user?.photoURL} />
        ))}
      </ActivitiesPageStyled>
    </Layout>
  )
}

export default ActivitiesPage
