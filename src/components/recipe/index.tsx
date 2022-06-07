import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IRecipe } from '../../types'

const RecipeStyled = styled.div`
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }
`

const Recipe: React.FC<IRecipe> = ({ id, name, cooking_time, difficulty }) => {
  return (
    <Link to={`/recipe/${id}`}>
      <RecipeStyled className="flex direction-column align-center">
        <img src="https://www.zastavki.com/pictures/1280x720/2009/Food___Pizza_Pizza_011915_26.jpg" />
        <div>
          {name}-{cooking_time}m-{difficulty}
        </div>
      </RecipeStyled>
    </Link>
  )
}

export default Recipe
