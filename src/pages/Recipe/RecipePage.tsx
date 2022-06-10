import styled from 'styled-components'
import Button from '../../components/button'
import Layout from '../../components/layout'
import { BsClockHistory } from 'react-icons/bs'
import { IoPeopleOutline } from 'react-icons/io5'
import { GoThumbsup, GoThumbsdown } from 'react-icons/go'

import { Link, useLocation, useParams } from 'react-router-dom'
import { IRecipe } from '../../types'
import { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  runTransaction,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import db, { auth, createActivity } from '../../app/firebase'

const RecipePageStyled = styled.div`
  .t {
    position: relative;
    width: 100%;

    .s {
      position: absolute;
      left: 50%;
      bottom: -6px;
      transform: translate(-50%, 0);

      background: ${({ theme }) => theme.colors.wheat};
      border-radius: 1.5rem;
      padding: 0.5rem 1.5rem;
      white-space: nowrap;

      .first {
        font-size: 1.25rem;
        text-align: center;
      }

      .second {
        letter-spacing: 0.5px;
      }
    }

    img {
      border-radius: 2rem;
      height: 100%;
      width: 100%;
    }
  }

  .ingredients-section {
    background: ${({ theme }) => theme.colors.darkPurple};
    color: ${({ theme }) => theme.colors.wheat};

    padding: 1rem;
    border-radius: 1.25rem;

    h3 {
      text-align: center;
      margin-top: 0;
      font-weight: 500;
    }
  }

  .ingredient {
    display: flex;
    justify-content: space-between;

    font-size: 0.8rem;

    border-bottom: 1px solid ${({ theme }) => theme.colors.wheat + '40'};
  }

  .servings-input {
    width: 2.5rem;
    border: none;
    border-radius: 0.25rem;
    text-align: center;
  }

  .steps-section {
    .step {
      position: relative;
      background-color: ${({ theme }) => theme.colors.darkPurple + '80'};
      color: white;
      border-radius: 0.75rem;
      padding: 0.5rem 1.5rem;

      .step-order {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-0.5rem, -0.5rem);

        background: ${({ theme }) => theme.colors.teal};
        width: 28px;
        line-height: 28px;
        border-radius: 50%;

        text-align: center;
      }
    }

    h4 {
      margin: 0 0 0.75rem 0;
    }
  }

  .like {
    width: 25%;
    background-color: ${({ theme }) => theme.colors.seaGreen};
    border-radius: 1rem 0 0 1rem;
    padding: 0.3rem;
  }
  .dislike {
    width: 25%;
    background-color: ${({ theme }) => theme.colors.darkPurple};
    color: white;
    border-radius: 0 1rem 1rem 0;
    padding: 0.3rem;
  }

  .tips-section {
    h3 {
      margin-top: 0;
    }
    li {
      opacity: 0.75;
    }
  }
`

const RecipePage = () => {
  const [recipe, setRecipe] = useState<IRecipe>()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeDoc = doc(db, `recipes/${id}`)

      const snapshot: IRecipe = await getDoc(recipeDoc).then(
        async (r: DocumentData) => {
          const ingredientCol = collection(r.ref, 'ingredients')
          const ingredientsSnapshot = await getDocs(ingredientCol)
          const ingredients = ingredientsSnapshot.docs.map(i => i.data())

          const stepCol = collection(r.ref, 'steps')
          const stepsSnapshot = await getDocs(stepCol)
          const steps = stepsSnapshot.docs.map(i => i.data())

          const tipCol = collection(r.ref, 'tips')
          const tipsSnapshot = await getDocs(tipCol)
          const tips = tipsSnapshot.docs.map(i => i.data())

          const result: IRecipe = {
            ...r.data(),
            id: r.id,
            ingredients,
            steps,
            tips,
          }
          return result
        }
      )

      // const snapshot: DocumentData = await getDoc(recipeDoc)
      // const data = snapshot.data()
      // const recipeData = snapshot.data()
      console.log(snapshot)
      if (snapshot) {
        setRecipe(snapshot)
      } else console.log('Incorrect id of the recipe')
    }

    fetchRecipe().then(() => setLoading(false))
  }, [])

  const like = async () => {
    if (!recipe?.id) return

    const recipeDoc = doc(db, `recipes/${recipe.id}`)
    runTransaction(db, async transaction => {
      return await transaction
        .get(recipeDoc)
        .then(async (data: DocumentData) => {
          const ratingsCol = collection(db, `recipes/${recipe.id}/ratings`)
          await getDocs(ratingsCol)
            .then(async rating => {
              if (!auth.currentUser) return

              const currentUserID = auth.currentUser?.uid

              const candidate = rating.docs.find(
                r => r.data().user == currentUserID
              )

              if (!candidate) {
                return await addDoc(
                  collection(db, `recipes/${recipe.id}/ratings`),
                  {
                    user: currentUserID,
                    type: 'like',
                  }
                ).then(d =>
                  transaction.update(recipeDoc, {
                    likes: data.data().likes ? data.data().likes + 1 : 1,
                  })
                )
              }
              if (candidate.data().type === 'dislike') {
                return await setDoc(candidate.ref, {
                  user: currentUserID,
                  type: 'like',
                }).then(q => {
                  const d = data.data()
                  transaction.update(recipeDoc, {
                    likes: d.likes ? d.likes + 1 : 1,
                    dislikes: d.dislikes && d.dislikes > 0 && d.dislikes - 1,
                  })
                })
              }
            })
            .then(() =>
              updateDoc(doc(db, `users/${auth.currentUser?.uid}`), {
                likes: arrayUnion(recipe.id),
                dislikes: arrayRemove(recipe.id),
              })
            )
        })
    })
      .then(() => createActivity('like', recipe.id!))
      .catch(err => console.log(err))
  }

  const dislike = async () => {
    const recipeDoc = doc(db, `recipes/${recipe?.id}`)
    runTransaction(db, async transaction => {
      return await transaction
        .get(recipeDoc)
        .then(async (data: DocumentData) => {
          const ratingsCol = collection(db, `recipes/${recipe?.id}/ratings`)
          await getDocs(ratingsCol)
            .then(async rating => {
              if (!auth.currentUser) return

              const currentUserID = auth.currentUser?.uid

              const candidate = rating.docs.find(
                r => r.data().user == currentUserID
              )

              if (!candidate) {
                return await addDoc(
                  collection(db, `recipes/${recipe?.id}/ratings`),
                  {
                    user: currentUserID,
                    type: 'dislike',
                  }
                ).then(d =>
                  transaction.update(recipeDoc, {
                    dislikes: data.data().dislikes
                      ? data.data().dislikes + 1
                      : 1,
                  })
                )
              }
              if (candidate.data().type === 'like') {
                return await setDoc(candidate.ref, {
                  user: currentUserID,
                  type: 'dislike',
                }).then(q => {
                  const d = data.data()
                  transaction.update(recipeDoc, {
                    likes: d.likes && d.likes > 0 && d.likes - 1,
                    dislikes: d.dislikes ? d.dislikes + 1 : 1,
                  })
                })
              }
            })
            .then(() =>
              updateDoc(doc(db, `users/${auth.currentUser?.uid}`), {
                dislikes: arrayUnion(recipe?.id),
                likes: arrayRemove(recipe?.id),
              })
            )
        })
    })
  }

  if (loading) return <div>Loading</div>

  return (
    <Layout>
      <RecipePageStyled className="content">
        <div className="t">
          <img src="https://www.zastavki.com/pictures/1280x720/2009/Food___Pizza_Pizza_011915_26.jpg" />
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
            <div>Portion for 2</div>
          </div>
        </div>
        <div className="text-center">
          <Button
            textColor="wheat"
            background="teal"
            fontSize="1.25rem"
            width="100%"
            padding=".4rem 0"
          >
            Add to collection
          </Button>
        </div>
        {/* ingredients */}
        <div className="ingredients-section">
          <h3>Ingredients</h3>
          {recipe?.ingredients && recipe.ingredients.length > 0 ? (
            recipe?.ingredients.map(i => (
              <div className="ingredient" key={uuidv4()}>
                <div>{i.name}</div>
                <div>
                  {i.amount}
                  {i.measure_method}
                </div>
              </div>
            ))
          ) : (
            <div>Author didn't provide ingredient list</div>
          )}
        </div>
        <div className="text-center">
          Number of servings{' '}
          <span>
            <input type="number" className="servings-input" defaultValue={2} />
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
          Author:{' '}
          <Link to="" className="link frame">
            Username
          </Link>
        </div>
        <div className="flex justify-center align-center">
          <div className="like flex justify-center align-center gap-small">
            <GoThumbsup onClick={like} /> {recipe?.likes || 0}
          </div>
          <div className="dislike flex justify-center align-center gap-small">
            <GoThumbsdown onClick={dislike} /> {recipe?.dislikes || 0}
          </div>
        </div>
        <div className="tips-section">
          {recipe?.tips && recipe.tips.length > 0 && (
            <>
              <h3>Tips</h3>
              <ul>
                {recipe.tips.map(l => (
                  <li key={`l_${l}`}>{l}</li>
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
