import styled from 'styled-components'
import { IComment } from '../../types'
import Layout from '../layout'
import { GoThumbsup, GoThumbsdown } from 'react-icons/go'

const lorem =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto magni nostrum, obcaecati dignissimos iure hic libero temporibus facere harum molestiae aperiam ratione itaque, ut sunt assumenda, quia voluptatibus ullam magnam?'

const CommentStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.seaGreen};
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;

  .profile-picture {
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
  }

  .username {
    font-weight: 500;
  }

  .comment-body {
    font-size: 0.75rem;
  }
`

const Comment: React.FC<IComment> = ({ body, user, created_at }) => {
  return (
    <Layout>
      <CommentStyled className="flex gap-small">
        <div className="profile-picture">
          <img src="https://www.zastavki.com/pictures/1280x720/2009/Food___Pizza_Pizza_011915_26.jpg" />
        </div>
        <div>
          <div className="flex align-center gap-small">
            <div className="username">Username</div>
            <GoThumbsup />
            <div className="fsize-negative-3" style={{ opacity: '0.5' }}>
              {created_at.toLocaleString()}
            </div>
          </div>
          <div className="comment-body">{lorem}</div>
        </div>
      </CommentStyled>
    </Layout>
  )
}

export default Comment
