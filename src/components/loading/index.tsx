import { ThreeDots } from 'react-loader-spinner'
import styled from 'styled-components'

const LoadingStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const generateColor = () => {
  const colors = ['#87664f60', '#368F8B', '#246A73', '#F3DFC1', '#160F29']
  return colors[Math.floor(Math.random() * colors.length)]
}

const Loading = () => {
  return (
    <LoadingStyled>
      <ThreeDots color={generateColor()} />
    </LoadingStyled>
  )
}

export default Loading
