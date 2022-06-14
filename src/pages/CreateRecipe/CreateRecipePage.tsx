import { useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/layout'
import { IngredientInterface, IRecipe, TagType } from '../../types'
import { BsFillPencilFill, BsClockHistory } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'
import { IoPeopleOutline } from 'react-icons/io5'
import Button from '../../components/button'
import Ingredient from '../../features/recipe/Ingredient'
import { gradient, custom_tags } from '../../custom-data'
import { createRecipe } from '../../app/calls/recipes'
import { createActivity } from '../../app/calls/activities'
import { notifyFailure, notifySuccess } from '../../components/toast'

const CreateRecipePageStyled = styled.div`
  .form-input {
    padding-bottom: 0.25rem;
    border-bottom: 0.5px solid #000000a6;
  }
  input {
    background: none;
    outline: none;
    border: none;
    font-size: 0.9rem;
    width: 100%;

    &::placeholder {
      color: black;
      opacity: 0.7;
      font-family: 'Raleway';
      font-weight: 300;
      letter-spacing: 0.5px;
    }
  }

  .option {
    background-color: ${({ theme }) => theme.colors.brown};
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
  }
  .active-option {
    box-shadow: 0 0 2px 1px black;
  }

  h3 {
    margin: 0;
  }

  .text-section {
    padding: 1rem;
    border-radius: 1rem;

    textarea {
      background: none;
      border-radius: 0.5rem;
      outline: none;
      border: 1px solid black;
      color: black;
      padding: 0.5rem;

      &::placeholder {
        color: black;
      }
    }
  }

  .brown {
    background: ${({ theme }) => theme.colors.brown};
  }
  .dark-brown {
    background: ${({ theme }) => theme.colors.darkPurple + '33'};
  }
  .tag {
    background: ${({ theme }) => theme.colors.seaGreen};
    color: ${({ theme }) => theme.colors.wheat};
  }
`

type DifficultyType = 'Beginner' | 'Intermediate' | 'Advanced'

const CreateRecipePage = () => {
  const [name, setName] = useState('')
  const [cookingTime, setCookingTime] = useState<number>()
  const [portion, setPortion] = useState<number>()
  const [difficulty, setDifficulty] = useState<DifficultyType>()
  const [image, setImage] = useState<File | null>()
  const [ingredients, setIngredients] = useState<IngredientInterface[]>([])
  const [steps, setSteps] = useState<string[]>([])
  const [tips, setTips] = useState<string[]>([])
  const [stepInput, setStepInput] = useState('')
  const [tipInput, setTipInput] = useState('')
  const [tags, setTags] = useState<TagType[]>([])

  const difficultiesArr: DifficultyType[] = [
    'Beginner',
    'Intermediate',
    'Advanced',
  ]

  const addStep = () => {
    setSteps([...steps, stepInput])
  }
  const addTip = () => {
    setTips([...tips, tipInput])
  }
  const isActive = (d: DifficultyType) => {
    if (d === difficulty) return true
    return false
  }
  const isActiveTag = (d: TagType) => {
    if (tags.includes(d)) return true
    return false
  }

  const handleSetTags = (tag: TagType) => {
    const includes = tags.includes(tag)
    if (includes) return setTags(tags.filter(t => t !== tag))
    setTags([...tags, tag])
  }

  const handleCreateRecipe = () => {
    if (!name || !cookingTime || !difficulty)
      return notifyFailure('Name, cooking time and difficulty must be provided')

    interface RecipeInterface extends IRecipe {
      image?: File | null
    }
    const recipe: RecipeInterface = {
      name,
      cooking_time: cookingTime,
      difficulty,
      portion: portion || 1,
      image,
      ingredients,
      tips,
      steps,
      tags,
    }

    createRecipe(recipe)
      .then(res => {
        if (!res) return
        createActivity('create_recipe', res)
      })
      .then(() => notifySuccess('You created a recipe'))
      .catch((err: Error) => notifyFailure(err.message))
  }

  return (
    <Layout>
      <CreateRecipePageStyled className="content">
        <div className="form-input flex align-center gap-small fsize-3 weight-light">
          <BsFillPencilFill />
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-input flex align-center gap-small fsize-3 weight-light">
          <BsClockHistory />
          <input
            type="number"
            placeholder="Cooking time in minutes"
            value={cookingTime}
            onChange={e => setCookingTime(e.target.valueAsNumber)}
          />
        </div>
        <div className="form-input flex align-center gap-small fsize-3 weight-light">
          <IoPeopleOutline />
          <input
            type="number"
            placeholder="Portion for how many people"
            value={portion}
            onChange={e => setPortion(e.target.valueAsNumber)}
          />
        </div>
        <div className="flex align-center gap-small">
          <span className="fsize-2 weight-medium">Difficulty: </span>
          {difficultiesArr.map(d => (
            <div
              key={uuidv4()}
              className={`option pointer ${isActive(d) ? 'active-option' : ''}`}
              onClick={() => setDifficulty(d)}
            >
              {d}
            </div>
          ))}
        </div>
        <div>
          Image:{' '}
          <input
            type="file"
            accept="image/*"
            className="upload-picture"
            placeholder="Upload picture"
            onChange={e => setImage(e.target.files![0])}
          />
        </div>
        <div className="flex direction-column gap-small">
          <h3>Ingredients</h3>
          {ingredients.length > 0 && (
            <div className="flex gap-small wrap">
              {ingredients.map(i => (
                <div key={uuidv4()}>
                  {i.name} - {i.amount}
                  {i.measure_method} |
                </div>
              ))}
            </div>
          )}
          <Ingredient setIngredients={setIngredients} />
        </div>
        <div className="flex direction-column gap-small">
          <h3>Step-by-step guide</h3>
          {steps.length > 0 &&
            steps.map(s => <input key={uuidv4()} value={s} readOnly />)}
          <div className="flex direction-column gap-medium text-section brown">
            <textarea
              placeholder="Step..."
              rows={3}
              value={stepInput}
              onChange={e => setStepInput(e.target.value)}
            />
            <Button
              textColor="black"
              borderColor="black"
              width="100%"
              fontSize="1rem"
              onClick={addStep}
            >
              Add Step
            </Button>
          </div>
        </div>
        <div className="flex direction-column gap-small">
          <h3>Tips</h3>
          {tips.length > 0 &&
            tips.map(t => <input key={uuidv4()} value={t} readOnly />)}
          <div className="flex direction-column gap-medium text-section dark-brown">
            <textarea
              placeholder="Tip..."
              rows={3}
              value={tipInput}
              onChange={e => setTipInput(e.target.value)}
            />
            <Button
              textColor="black"
              borderColor="black"
              width="100%"
              fontSize="1rem"
              onClick={addTip}
            >
              Add Tip
            </Button>
          </div>
        </div>
        <div className="flex direction-column gap-small">
          <h3>Tags</h3>
          <div className="flex gap-small wrap">
            {custom_tags.map(t => (
              <div
                key={t}
                className={`option tag pointer ${
                  isActiveTag(t) ? 'active-option' : ''
                }`}
                onClick={() => handleSetTags(t)}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <Button
          textColor="white"
          gradient={gradient}
          fontSize="1.1rem"
          padding=".5rem 0"
          onClick={handleCreateRecipe}
        >
          Create recipe
        </Button>
      </CreateRecipePageStyled>
    </Layout>
  )
}

export default CreateRecipePage
