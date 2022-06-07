import { useEffect, useState } from 'react'
import Recipes from '../../components/recipe/Recipes'
import Layout from '../../components/layout'
import { ImEye, ImEyeBlocked } from 'react-icons/im'
import { IFilter, IRecipe, IUser } from '../../types'
import { getFilteredRecipes } from '../../functions/filter'
// firestore
import { fetchRecipes, fetchUsers } from '../../app/firebase'
import RecipesPageStyled from './RecipesPageStyled'
import Filter from '../../features/filter'

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<IUser[]>([])

  const [filters, setFilters] = useState<IFilter[]>([])
  const [filterOpen, setFilterOpen] = useState(true)

  useEffect(() => {
    fetchRecipes()
      .then(r => setRecipes(r))
      .then(() => fetchUsers().then(u => setUsers(u)))
      .then(() => setLoading(false))
      .catch(e => console.log(e))
  }, [])

  const getRecipes = () => {
    const filteredRecipes = getFilteredRecipes(recipes, filters)
    return filteredRecipes
  }

  if (loading) return <div>Loading</div>

  return (
    <Layout>
      <RecipesPageStyled className="content">
        <div>
          <div
            className="flex align-center gap-tiny"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Filter{' '}
            {filterOpen ? (
              <ImEyeBlocked className="icon" />
            ) : (
              <ImEye className="icon" />
            )}
          </div>
          {filterOpen && (
            <Filter
              filters={filters}
              setFilterOpen={setFilterOpen}
              setFilters={setFilters}
              users={users}
            />
          )}
        </div>
        <Recipes recipes={getRecipes()} />
      </RecipesPageStyled>
    </Layout>
  )
}

export default RecipesPage
