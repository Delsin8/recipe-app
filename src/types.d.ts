export interface IRecipe {
  id: string
  name: string
  cooking_time: number
  difficulty: string
  ingredients?: ingredient[]
  steps?: step[]
  tips?: tip[]
}

interface ingredient {
  id: string
  name: string
  measure_method: string
  amount: number
}
interface step {
  id: string
  body: string
}
interface tip {
  id: string
  body: string
}

export interface IUser {
  _id: string
  name: string
}

export interface IComment {
  _id: string
  user: IUser
  body: string
  created_at: Date
}
