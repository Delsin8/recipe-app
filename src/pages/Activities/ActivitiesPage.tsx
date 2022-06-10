import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, fetchActivities, markActivities } from '../../app/firebase'
import Layout from '../../components/layout'
import Activity from '../../features/activity'
import { IActivity } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const ActivitiesPageStyled = styled.div`
  .profile-picture {
    flex-shrink: 0;
    width: 36px;
    height: 36px;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
`

const ActivitiesPage = () => {
  const [user, loadingUser, error] = useAuthState(auth)
  const [activities, setActivities] = useState<IActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    fetchActivities(user.uid)
      .then(result => setActivities(result))
      .then(() => markActivities(user.uid))
      .catch(err => console.log(err))
  }, [user])

  // create scenarios when activities will be fired (create recipe, subscribe, like, add to collection)
  // implement that
  // add case where there are no activities (describe what activities exist and how to fire them)

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
