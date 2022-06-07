import { useState } from 'react'
import { BiCookie } from 'react-icons/bi'
import RecipeStyled from './RecipeStyled'
import { AiOutlineNumber } from 'react-icons/ai'
import Button from '../../components/button'
import { IngredientInterface } from '../../types'

type Method = 'gram' | 'ounce' | 'cup' | 'ml'

interface ingredient {
  setIngredients: React.Dispatch<React.SetStateAction<IngredientInterface[]>>
}

const Ingredient: React.FC<ingredient> = ({ setIngredients }) => {
  const [name, setName] = useState('')
  const [method, setMethod] = useState<Method>()
  const [amount, setAmount] = useState<number>(1)
  const methodsArr: Method[] = ['gram', 'ounce', 'cup', 'ml']

  const addIngredient = () => {
    if (!name || !method || !amount) return
    const newIngredient: IngredientInterface = {
      name,
      measure_method: method || 'gram',
      amount,
    }
    setIngredients(prevState => [...prevState, newIngredient])
  }

  const isActive = (m: Method) => {
    if (m === method) return true
    return false
  }

  return (
    <RecipeStyled className="flex direction-column gap-medium">
      <div className="form-input flex align-center gap-small fsize-3 weight-light">
        <BiCookie />
        <input
          placeholder="Ingredient name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="flex align-center gap-small">
        Measure:
        {methodsArr.map(m => (
          <div
            key={m}
            className={`measure-item ${isActive(m) ? 'item-active' : ''}`}
            onClick={() => setMethod(m)}
          >
            {m}
          </div>
        ))}
      </div>
      <div className="form-input flex align-center gap-small fsize-3 weight-light">
        <AiOutlineNumber />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.valueAsNumber)}
        />
      </div>
      <Button
        textColor="wheat"
        background="seaGreen"
        fontSize="1.1rem"
        onClick={addIngredient}
      >
        Add ingredient
      </Button>
    </RecipeStyled>
  )
}

export default Ingredient
