import styled from 'styled-components'
import Comment from '../../components/comment'
import Layout from '../../components/layout'
import { IComment } from '../../types'

const CommentsPageStyled = styled.div``

const lorem =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem at eius, enim, perferendis incidunt officiis odio quibusdam ex minima molestias non. Eum, explicabo? Distinctio, reprehenderit deserunt voluptatum impedit repellat fugit!'

const CommentsPage = () => {
  const comments: IComment[] = [
    {
      _id: '1',
      body: lorem,
      created_at: new Date(),
      user: {
        id: '123',
        name: 'Smiles',
      },
    },
  ]

  return (
    <Layout className="content">
      <CommentsPageStyled>
        {comments.map(c => (
          <Comment key={`c_${c._id}`} {...c} />
        ))}
      </CommentsPageStyled>
    </Layout>
  )
}

export default CommentsPage
