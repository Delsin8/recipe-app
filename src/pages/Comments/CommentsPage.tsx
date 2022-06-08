import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { fetchComments, sendComment } from '../../app/firebase'
import Button from '../../components/button'
import Comment from '../../components/comment'
import Layout from '../../components/layout'
import { IComment } from '../../types'
import { v4 as uuidv4 } from 'uuid'

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
`

const lorem =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem at eius, enim, perferendis incidunt officiis odio quibusdam ex minima molestias non. Eum, explicabo? Distinctio, reprehenderit deserunt voluptatum impedit repellat fugit!'

const CommentsPage = () => {
  const [comments, setComments] = useState<IComment[]>()
  const [loading, setLoading] = useState(true)
  const [commentInput, setCommentInput] = useState('')
  const { id } = useParams()

  const addComment = () => {
    if (!commentInput || !id) return
    sendComment(commentInput, id)
  }

  useEffect(() => {
    if (!id) return
    fetchComments(id)
      .then(result => setComments(result))
      .then(() => setLoading(true))
      .catch(err => console.log(err))
  }, [])

  return (
    <Layout>
      <CommentsPageStyled>
        <div className="flex direction-column gap-small">
          <textarea
            rows={3}
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            placeholder="Start typing your comment"
          />
          <Button textColor="wheat" background="seaGreen" onClick={addComment}>
            Send comment
          </Button>
        </div>
        {comments?.map(c => (
          <Comment key={uuidv4()} {...c} />
        ))}
      </CommentsPageStyled>
    </Layout>
  )
}

export default CommentsPage
