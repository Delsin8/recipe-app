import styled from 'styled-components'
import { FiMenu } from 'react-icons/fi'
import { BsBell } from 'react-icons/bs'
const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.brown};

  h1 {
    margin: 0;
    // font-size: 1.5rem;
    font-weight: 200;
    padding-left: 0.5rem;
  }

  .icons-wrapper {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .icon {
    font-size: 2rem;
    // font-weight: 300;
  }

  .bell {
    font-size: 1.75rem;
  }
`

const Header = () => {
  return (
    <HeaderStyled>
      <h1>Recipe app</h1>
      <div className="icons-wrapper">
        <BsBell className="icon bell" />
        <FiMenu className="icon" />
      </div>
    </HeaderStyled>
  )
}

export default Header
