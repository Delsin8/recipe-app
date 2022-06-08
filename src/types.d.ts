import { DocumentReference, Timestamp } from 'firebase/firestore'

export interface IRecipe {
  id?: string
  name: string
  cooking_time: number
  difficulty: string
  portion: number
  author?: DocumentReference
  ingredients?: IngredientInterface[]
  steps?: string[]
  tips?: string[]
  tags?: string[]
  likes?: number
  dislikes?: number
}

export interface IngredientInterface {
  id?: string
  name: string
  measure_method: string
  amount: number
}

export interface IFilter {
  type: 'time' | 'difficulty' | 'tag' | 'rating' | 'user'
  value: number | string
}

export interface IUser {
  id: string
  name: string
  photoURL?: string
  likes?: string[]
  dislikes?: string[]
}

export interface IComment {
  id?: string
  author: IUser
  body: string
  created_at: Timestamp
}

export type TagType =
  | 'Vegan'
  | 'Healthy'
  | 'Korean'
  | 'Dessert'
  | 'Dairy-free'
  | 'Beverage'
  | 'Snack'
