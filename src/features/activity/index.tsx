import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { default_user_photo } from '../../custom-data'
import { IActivity } from '../../types'

const ActivityStyled = styled.div`
  .profile-picture {
    height: 40px;
    width: 40px;

    img {
      height: 100%;
      width: 100%;
      border-radius: 0.25rem;
    }
  }

  .activity-body {
    white-space: nowrap;
  }
`
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
          <Link to={`/recipe/${other}`} className="link frame frame-brown">
            recipe
          </Link>
        </div>
      )
      break

    case 'create_recipe':
      body = (
        <div>
          Created{' '}
          <Link to={`/recipe/${other}`} className="link frame frame-brown">
            recipe
          </Link>
        </div>
      )
      break

    case 'add_to_collection':
      body = (
        <div>
          Added
          <Link to={`/recipe/${other}`} className="link frame frame-brown">
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
          <Link to={`/user/${other}`} className="link frame frame-brown">
            user
          </Link>
        </div>
      )
      break

    default:
      body = <div>Something went wrong with fetching activity</div>
      break
  }

  return (
    <ActivityStyled className="flex align-center gap-small">
      <div className="profile-picture">
        <img src={userImg || default_user_photo} />
      </div>
      <div className="activity-body">
        <span>{body}</span>
        <span className="fsize-negative-2" style={{ opacity: '.75' }}>
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
