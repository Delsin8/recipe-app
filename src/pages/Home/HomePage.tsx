import styled from 'styled-components'
import Layout from '../../components/layout'
import Recipe from '../../components/recipe'
import Recipes from '../../components/recipe/Recipes'
import { IRecipe } from '../../types'

const HomePageStyled = styled.div`
  h3 {
    margin: 0 0 0.25rem 0;
  }
`

const recipe: IRecipe = {
  name: 'Very tasty looking pizza',
}

const HomePage = () => {
  return (
    <Layout>
      <HomePageStyled className="content">
        <div>
          <h3 className="weight-extra-light">Last added</h3>
          <Recipe {...recipe} />
        </div>
        <div>
          <h3 className="inline-block weight-regular frame">Vegan recipes</h3>
          <Recipes recipes={[recipe, recipe, recipe, recipe]} />
        </div>
        <div>
          <h3 className="inline-block weight-regular frame">Desserts</h3>
          <Recipes recipes={[recipe, recipe, recipe, recipe]} />
        </div>
        <div>
          <h3 className="weight-extra-light">Most popular</h3>
          <Recipe {...recipe} />
        </div>
        <div>
          <h3 className="inline-block weight-regular frame">
            Cook it in 5 minutes
          </h3>
          <Recipes recipes={[recipe, recipe, recipe, recipe]} />
        </div>
        <div>
          <h3 className="inline-block weight-regular frame">
            Beginner friendly
          </h3>
          <Recipes recipes={[recipe, recipe, recipe, recipe]} />
        </div>
        <div>
          <h3 className="inline-block weight-regular frame">Highest rated</h3>
          <Recipes recipes={[recipe, recipe, recipe, recipe]} />
        </div>
      </HomePageStyled>
    </Layout>
  )
}

export default HomePage
