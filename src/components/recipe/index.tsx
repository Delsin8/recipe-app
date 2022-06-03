import styled from 'styled-components'
import { IRecipe as recipe } from '../../types'

const RecipeStyled = styled.div`
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }
`

interface IRecipe {
  recipe: recipe
  type?: 'default' | 'extended'
}

const Recipe: React.FC<IRecipe> = ({ recipe, type = 'default' }) => {
  const { name } = recipe

  switch (type) {
    case 'extended':
      return (
        <RecipeStyled className="flex direction-column align-center">
          <img src="https://www.zastavki.com/pictures/1280x720/2009/Food___Pizza_Pizza_011915_26.jpg" />
          <div>{name}</div>
        </RecipeStyled>
      )

    default:
      return (
        <RecipeStyled className="flex direction-column align-center">
          <img src="https://www.zastavki.com/pictures/1280x720/2009/Food___Pizza_Pizza_011915_26.jpg" />
          <div>{name}</div>
        </RecipeStyled>
      )
  }
}

export default Recipe
