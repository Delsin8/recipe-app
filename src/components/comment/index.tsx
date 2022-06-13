import styled from 'styled-components'
import { IComment } from '../../types'
import { GoThumbsup, GoThumbsdown } from 'react-icons/go'
import { useParams } from 'react-router-dom'
import { default_user_photo } from '../../custom-data'

const CommentStyled = styled.div`
  .container {
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
      word-break: break-all;
    }
  }

  .liked {
    border: 1px solid ${({ theme }) => theme.colors.seaGreen};
  }
  .disliked {
    border: 1px solid ${({ theme }) => theme.colors.darkPurple};
  }
`

const Comment: React.FC<IComment> = ({ body, author, created_at }) => {
  const { name, dislikes, likes, photoURL } = author
  const { id } = useParams()

  const defineStyle = () => {
    const isLiked = likes?.some(l => l === id)
    if (isLiked) return 'liked'

    const isDisliked = dislikes?.some(d => d === id)
    if (isDisliked) return 'disliked'
  }

  return (
    <CommentStyled>
      <div className={`container flex gap-small ${defineStyle()}`}>
        <div className="profile-picture">
          <img src={`${photoURL || default_user_photo}`} />
        </div>
        <div>
          <div className="flex align-center gap-small">
            <div className="username">{name}</div>
            {(defineStyle() === 'liked' && <GoThumbsup />) ||
              (defineStyle() === 'disliked' && <GoThumbsdown />)}
            <div className="fsize-negative-3" style={{ opacity: '0.5' }}>
              {created_at.toDate().toLocaleString()}
            </div>
          </div>
          <div className="comment-body">{body}</div>
        </div>
      </div>
    </CommentStyled>
  )
}

export default Comment
