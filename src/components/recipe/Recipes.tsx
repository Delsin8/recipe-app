import { ReactNode } from 'react'
import styled from 'styled-components'
import Recipe from '.'
import { IRecipe } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const RecipesStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
`

interface IRecipes {
  recipes: IRecipe[]
}

const Recipes: React.FC<IRecipes> = ({ recipes }) => {
  console.log(recipes)
  return (
    <RecipesStyled>
      {recipes.map(r => (
        <Recipe key={uuidv4()} {...r} />
      ))}
    </RecipesStyled>
  )
}

export default Recipes
