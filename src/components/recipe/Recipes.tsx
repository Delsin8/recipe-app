import styled from 'styled-components'
import Recipe from '.'
import { IRecipe } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const RecipesStyled = styled.div<{ type: 'grid' | 'flex' }>`
  ${({ type }) =>
    type === 'flex'
      ? `display: flex; gap: 0.5rem;`
      : `display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 0.5rem;

      @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
      }
  `}
`

interface IRecipes {
  recipes: IRecipe[]
  type?: 'grid' | 'flex'
}

const Recipes: React.FC<IRecipes> = ({ recipes, type = 'grid' }) => {
  switch (type) {
    case 'flex':
      return (
        <RecipesStyled type="flex">
          {recipes.map(r => (
            <Recipe isStatic key={uuidv4()} {...r} />
          ))}
        </RecipesStyled>
      )
    default:
      return (
        <RecipesStyled type="grid">
          {recipes.map(r => (
            <Recipe key={uuidv4()} {...r} />
          ))}
        </RecipesStyled>
      )
  }
}

export default Recipes
