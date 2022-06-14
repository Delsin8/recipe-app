import styled from 'styled-components'
import Button from '../../components/button'
import Layout from '../../components/layout'
import { BsClockHistory } from 'react-icons/bs'
import { IoPeopleOutline } from 'react-icons/io5'
import { GoThumbsup, GoThumbsdown } from 'react-icons/go'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { IngredientInterface, IRecipe } from '../../types'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import db, { auth } from '../../app/firebase'
import { createActivity } from '../../app/calls/activities'
import {
  checkIfBelongsToCollection,
  addRecipeToCollection,
} from '../../app/calls/collections'
import Loading from '../../components/loading'
import { default_recipe_photo } from '../../custom-data'
import RecipePageStyled from './RecipePageStyled'
import { useAuthState } from 'react-firebase-hooks/auth'
import { dislike, like } from '../../app/calls/recipes'

const RecipePage = () => {
  const [recipe, setRecipe] = useState<IRecipe>()
  const [ingredients, setIngredients] = useState<IngredientInterface[]>([])
  const [portions, setPortions] = useState<number>()
  const [loading, setLoading] = useState(true)
  const [user, userLoading, error] = useAuthState(auth)

  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const recipeDoc = doc(db, `recipes/${id}`)

    const unsubscribe = () =>
      onSnapshot(recipeDoc, snapshot => {
        const result = { ...snapshot.data(), id: snapshot.id } as IRecipe
        setRecipe(result)
        setPortions(result.portion)
        setLoading(false)
      })

    const fetchIngredients = async () => {
      try {
        const ingredientCol = collection(recipeDoc, 'ingredients')
        const ingredientsSnapshot = await getDocs(ingredientCol)
        const ingredients = ingredientsSnapshot.docs.map(i =>
          i.data()
        ) as IngredientInterface[]

        setIngredients(ingredients)
      } catch (error) {
        throw new Error()
      }
    }

    fetchIngredients().catch(err => console.log(err))

    return unsubscribe()
  }, [])

  const addToCollection = () => {
    if (!user) return navigate('/signin')
    const recipeID = recipe?.id
    if (!recipeID) return
    addRecipeToCollection(recipeID)
      .then(() => checkIfBelongsToCollection(recipeID))
      .then(exists => {
        exists && createActivity('add_to_collection', recipeID)
      })
  }

  const getServings = (ingredient: IngredientInterface) => {
    if (!portions || !recipe?.portion) return ingredient.amount
    const singlePortion = ingredient.amount / recipe?.portion
    const calculatedPortion = singlePortion * portions
    return `${calculatedPortion} ${
      calculatedPortion === 1
        ? ingredient.measure_method
        : ingredient.measure_method + 's'
    }`
  }

  const handleLike = () => {
    if (!recipe?.id) return
    if (!user) return navigate('/signin')

    like(recipe.id)
      .then(() => createActivity('like', recipe.id!))
      .catch(err => console.log(err))
  }
  const handleDislike = () => {
    if (!recipe?.id) return
    if (!user) return navigate('/signin')

    dislike(recipe.id).catch(err => console.log(err))
  }

  if (loading) return <Loading />

  return (
    <Layout>
      <RecipePageStyled className="content">
        <div className="t">
          <img src={`${recipe?.photo ? recipe.photo : default_recipe_photo}`} />
          <div className="s">
            <div className="first">{recipe?.name}</div>
            <div className="second">Difficulty: {recipe?.difficulty}</div>
          </div>
          {/* clock, portion */}
        </div>
        <div className="flex gap-medium justify-center">
          <div className="flex align-center gap-small">
            <BsClockHistory />
            <div>{recipe?.cooking_time}m of cooking</div>
          </div>
          <div className="flex align-center gap-small">
            <IoPeopleOutline />
            <div>Portion for {recipe?.portion}</div>
          </div>
        </div>
        <div className="text-center">
          <Button
            textColor="wheat"
            background="teal"
            fontSize="1.25rem"
            width="100%"
            padding=".4rem 0"
            onClick={addToCollection}
          >
            Add to collection
          </Button>
        </div>
        {/* ingredients */}
        <div className="ingredients-section">
          <h3>Ingredients</h3>
          {ingredients.length > 0 ? (
            ingredients.map(i => (
              <div className="ingredient" key={uuidv4()}>
                <div>{i.name}</div>
                <div>{getServings(i)}</div>
              </div>
            ))
          ) : (
            <div>Author didn't provide ingredient list</div>
          )}
        </div>
        <div className="text-center">
          Number of servings{' '}
          <span>
            <input
              type="number"
              className="servings-input"
              value={portions}
              onChange={e => setPortions(e.target.valueAsNumber)}
            />
          </span>
        </div>
        {/* steps */}
        <div className="steps-section">
          <h4>Step-by-step guide</h4>
          <div className="flex direction-column gap-medium">
            {recipe?.steps && recipe.steps.length > 0 ? (
              recipe?.steps.map((s, index) => (
                <div key={uuidv4()} className="step">
                  <div>{s}</div>
                  <div className="step-order">{index + 1}</div>
                </div>
              ))
            ) : (
              <div>Author didn't describe step-by-step guide</div>
            )}
          </div>
        </div>
        <div>
          <Link to={`/user/${recipe?.author}`} className="link frame">
            Author
          </Link>
        </div>
        <div className="flex justify-center align-center">
          <div className="like flex justify-center align-center gap-small">
            <GoThumbsup className="pointer" onClick={handleLike} />{' '}
            {recipe?.likes || 0}
          </div>
          <div className="dislike flex justify-center align-center gap-small">
            <GoThumbsdown className="pointer" onClick={handleDislike} />{' '}
            {recipe?.dislikes || 0}
          </div>
        </div>
        <div className="tips-section">
          {recipe?.tips && recipe.tips.length > 0 && (
            <>
              <h3>Tips</h3>
              <ul>
                {recipe.tips.map(l => (
                  <li key={uuidv4()}>{l}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <Link to={`${pathname}/comments`} className="text-center">
          <Button
            textColor="wheat"
            background="darkPurple"
            padding="0.5rem 16%"
          >
            Comments
          </Button>
        </Link>
      </RecipePageStyled>
    </Layout>
  )
}

export default RecipePage
