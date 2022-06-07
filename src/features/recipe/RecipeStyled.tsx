import styled from 'styled-components'

const RecipeStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.wheat};
  padding: 1rem;
  border-radius: 1rem;

  .measure-item {
    padding: 0.25rem 0.75rem;
    background-color: ${({ theme }) => theme.colors.brown};
    border-radius: 1rem;
    cursor: pointer;
  }

  .item-active {
    box-shadow: 0 0 2px 1px ${({ theme }) => theme.colors.black};
  }
`

export default RecipeStyled
