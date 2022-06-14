import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchRecipes } from '../../app/calls/recipes'
import Carousel from '../../components/carousel'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import Recipe from '../../components/recipe'
import Recipes from '../../components/recipe/Recipes'
import {
  getDesserts,
  getForBeginners,
  getInFiveMinutes,
  getLastAdded,
  getMostPopular,
  getVegan,
} from '../../functions/recipes_selection'
import { IRecipe } from '../../types'

const HomePageStyled = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
  }
`

const HomePage = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecipes(false)
      .then(r => {
        setRecipes(r)
        setLoading(false)
      })
      .catch(e => console.log(e))
  }, [])

  if (loading) return <Loading />

  return (
    <Layout>
      <HomePageStyled className="content">
        <div>
          <h3 className="weight-extra-light">Last added</h3>
          <Recipe {...getLastAdded(recipes)} />
        </div>
        <div>
          <h3 className="inline-block weight-regular frame">Vegan recipes</h3>
          <Carousel>
            <Recipes type="flex" recipes={getVegan(recipes)} />
          </Carousel>
        </div>
        <div>
          <h3 className="inline-block weight-regular frame">Desserts</h3>
          <Carousel>
            <Recipes type="flex" recipes={getDesserts(recipes)} />
          </Carousel>
        </div>
        <div>
          <h3 className="weight-extra-light">Most popular</h3>
          <Recipe {...getMostPopular(recipes)} />
        </div>
        <div>
          <h3 className="inline-block weight-regular frame">
            Cook it in 5 minutes
          </h3>
          <Carousel>
            <Recipes type="flex" recipes={getInFiveMinutes(recipes)} />
          </Carousel>
        </div>
        <div>
          <h3 className="inline-block weight-regular frame">
            Beginner friendly
          </h3>
          <Carousel>
            <Recipes type="flex" recipes={getForBeginners(recipes)} />
          </Carousel>
        </div>
      </HomePageStyled>
    </Layout>
  )
}

export default HomePage
