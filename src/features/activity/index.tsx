import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IActivity } from '../../types'

const ActivityStyled = styled.div``
type d = '1' | '2'
const Activity: React.FC<IActivity & { userImg?: string | null }> = ({
  type,
  other,
  created_at,
  userImg,
}) => {
  let body
  switch (type) {
    case 'like':
      body = (
        <div>
          Liked a{' '}
          <Link to={`/recipe/${other}`} className="link frame">
            recipe
          </Link>
        </div>
      )
      break

    case 'create_recipe':
      body = (
        <div>
          Created{' '}
          <Link to={`/recipe/${other}`} className="link frame">
            recipe
          </Link>
        </div>
      )
      break

    case 'add_to_collection':
      body = (
        <div>
          Added
          <Link to={`/recipe/${other}`} className="link frame">
            recipe
          </Link>
          to collection
        </div>
      )
      break

    case 'subscribe':
      body = (
        <div>
          Subscribed to{' '}
          <Link to={`/user/${other}`} className="link frame">
            user
          </Link>
        </div>
      )
      break

    default:
      body = <div>Something went wrong with fetching activity</div>
      break
  }

  console.log(created_at)
  return (
    <ActivityStyled className="flex align-center gap-small">
      {/* picture */}
      <div className="profile-picture">
        <img src={userImg || 'DEFAULT IMAGE'} />
      </div>
      {/* event */}
      <div className="fsize-negative-2">
        <span>{body}</span>
        {/* time */}
        <span className="fsize-negative-3" style={{ opacity: '.75' }}>
          {' '}
          {created_at &&
            `${created_at.toDate().toLocaleTimeString()} ${created_at
              .toDate()
              .toDateString()} `}
        </span>
      </div>
    </ActivityStyled>
  )
}

export default Activity
