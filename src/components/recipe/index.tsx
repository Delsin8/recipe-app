import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { default_recipe_photo } from '../../custom-data'
import { IRecipe } from '../../types'

const RecipeStyled = styled.div<{ isStatic?: boolean }>`
  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 16/9;
    border-radius: 1rem;
  }

  ${({ isStatic }) =>
    isStatic &&
    `width: 320px;
    height: 200px;
    display: inline-block;
    text-align: center;
  `}
`

const Recipe: React.FC<IRecipe & { isStatic?: boolean }> = ({
  id,
  name,
  cooking_time,
  difficulty,
  photo,
  isStatic,
}) => {
  const styles = `${isStatic ? 'static' : 'flex direction-column align-center'}`

  return (
    <Link to={`/recipe/${id}`}>
      <RecipeStyled isStatic={isStatic} className={styles}>
        <img src={`${photo ? photo : default_recipe_photo}`} />
        <div>{name}</div>
      </RecipeStyled>
    </Link>
  )
}

export default Recipe
