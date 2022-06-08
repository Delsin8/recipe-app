import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IRecipe } from '../../types'

const RecipeStyled = styled.div<{ isStatic?: boolean }>`
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }

  ${({ isStatic }) =>
    isStatic &&
    `width: 320px;
  height: 200px;`}
`

const Recipe: React.FC<IRecipe & { isStatic?: boolean }> = ({
  id,
  name,
  cooking_time,
  difficulty,
  isStatic,
}) => {
  const styles = `${isStatic ? 'static' : 'flex direction-column align-center'}`

  return (
    <Link to={`/recipe/${id}`}>
      <RecipeStyled isStatic={isStatic} className={styles}>
        <img src="https://www.zastavki.com/pictures/1280x720/2009/Food___Pizza_Pizza_011915_26.jpg" />
        <div>
          {name}-{cooking_time}m-{difficulty}
        </div>
      </RecipeStyled>
    </Link>
  )
}

export default Recipe
