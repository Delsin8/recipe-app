import { orderBy, sortBy } from 'lodash'
import { IRecipe } from '../types'

export const getLastAdded = (recipes: IRecipe[]) => {
  const filtered = recipes.filter(recipe => recipe.created_at)
  return orderBy(
    filtered,
    ({ created_at }) => created_at && new Date(created_at.toDate()),
    'desc'
  )[0]
}
export const getVegan = (recipes: IRecipe[]) => {
  return recipes.filter(recipe => recipe.tags?.includes('Vegan'))
}
export const getDesserts = (recipes: IRecipe[]) => {
  return recipes.filter(recipe => recipe.tags?.includes('Dessert'))
}
export const getMostPopular = (recipes: IRecipe[]) => {
  return sortBy(recipes, 'likes')[0]
}
export const getInFiveMinutes = (recipes: IRecipe[]) => {
  return recipes.filter(recipe => recipe.cooking_time <= 5)
}
export const getForBeginners = (recipes: IRecipe[]) => {
  return recipes.filter(recipe => recipe.difficulty === 'Beginner')
}
