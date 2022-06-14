import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import db, { auth } from '../../app/firebase'
import { fetchComments, sendComment } from '../../app/calls/comments'
import Button from '../../components/button'
import Comment from '../../components/comment'
import Layout from '../../components/layout'
import { IComment } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import Loading from '../../components/loading'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, doc, onSnapshot } from 'firebase/firestore'

const CommentsPageStyled = styled.div`
  textarea {
    outline: none;
    border: none;
    border-radius: 0.25rem;
    background: ${({ theme }) => theme.colors.wheat};
    padding: 0.5rem;

    &::placeholder {
      color: black;
      opacity: 0.7;
    }
  }

  @media (min-width: 992px) {
    button {
      font-size: 1.1rem;
    }
  }
`

const CommentsPage = () => {
  const [user, userLoading, error] = useAuthState(auth)
  const [comments, setComments] = useState<IComment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentInput, setCommentInput] = useState('')
  const { id } = useParams()

  const addComment = () => {
    if (!commentInput || !id) return
    sendComment(commentInput, id)
      .then(res => {
        res && setComments(prev => [...prev, res])
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!id) return

    fetchComments(id)
      .then(result => {
        result && setComments(result)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  if (loading) return <Loading />

  return (
    <Layout>
      <CommentsPageStyled className="content">
        {user && (
          <div className="flex direction-column gap-small">
            <textarea
              rows={3}
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              placeholder="Start typing your comment"
            />
            <Button
              textColor="wheat"
              background="seaGreen"
              onClick={addComment}
            >
              Send comment
            </Button>
          </div>
        )}
        {comments?.map(c => (
          <Comment key={uuidv4()} {...c} />
        ))}
      </CommentsPageStyled>
    </Layout>
  )
}

export default CommentsPage
