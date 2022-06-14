import { IRecipe, IFilter } from '../types'

export const getFilteredRecipes = (recipes: IRecipe[], filters: IFilter[]) => {
  return recipes.filter(recipe => {
    const showByTime = isShowByTime(recipe, filters)
    const showByDifficulty = isShowByDifficulty(recipe, filters)
    const showByTag = isShowByTag(recipe, filters)
    const showByRating = isShowByRating(recipe, filters)
    const showByUser = isShowByUser(recipe, filters)

    return (
      showByTime && showByDifficulty && showByTag && showByRating && showByUser
    )
  })
}

// filtering functions
const isShowByTime = (recipe: IRecipe, filters: IFilter[]) => {
  const timeFilter = filters.filter(f => f.type === 'time')
  if (!timeFilter.length) return true

  const exists = timeFilter.filter(
    f =>
      (f.value === 'Quick' && recipe.cooking_time <= 10) ||
      (f.value === 'Medium' &&
        recipe.cooking_time > 10 &&
        recipe.cooking_time < 40) ||
      (f.value === 'Long' && recipe.cooking_time >= 40)
  )
  if (exists.length) return true
  return false
}

const isShowByDifficulty = (recipe: IRecipe, filters: IFilter[]) => {
  const difficultyFilter = filters.filter(f => f.type === 'difficulty')
  if (!difficultyFilter.length) return true

  const exists = difficultyFilter.filter(f => recipe.difficulty === f.value)
  if (exists.length) return true
  return false
}

const isShowByTag = (recipe: IRecipe, filters: IFilter[]) => {
  const tagFilter = filters.filter(f => f.type === 'tag')
  if (!tagFilter.length) return true

  const exists = tagFilter.filter(f =>
    recipe.tags?.includes(f.value.toString())
  )
  if (exists.length) return true
  return false
}

const isShowByRating = (recipe: IRecipe, filters: IFilter[]) => {
  const ratingFilter = filters.filter(f => f.type === 'rating')
  if (!ratingFilter.length) return true

  const { likes, dislikes } = recipe

  if (!likes) return false
  const approved = likes / (likes + (dislikes || 0))

  if (approved >= 0.8) return true
  return false
}

const isShowByUser = (recipe: IRecipe, filters: IFilter[]) => {
  const userFilter = filters.filter(f => f.type === 'user')
  if (!userFilter.length) return true
  const user = userFilter.some(u => {
    return recipe.author === u.value || ''
  })

  if (user) return true
  return false
}
