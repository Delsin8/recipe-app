import { DocumentReference } from 'firebase/firestore'

export interface IRecipe {
  id: string
  name: string
  cooking_time: number
  difficulty: string
  author?: DocumentReference
  ingredients?: ingredient[]
  steps?: step[]
  tips?: tip[]
  tags?: string[]
  likes?: number
  dislikes?: number
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
export interface IFilter {
  type: 'time' | 'difficulty' | 'tag' | 'rating' | 'user'
  value: number | string
}

export interface IUser {
  id: string
  name: string
  photoURL?: string
}

export interface IComment {
  _id: string
  user: IUser
  body: string
  created_at: Date
}
