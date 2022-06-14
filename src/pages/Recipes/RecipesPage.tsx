import { useEffect, useState } from 'react'
import Recipes from '../../components/recipe/Recipes'
import Layout from '../../components/layout'
import { ImEye, ImEyeBlocked } from 'react-icons/im'
import { IFilter, IRecipe, IUser } from '../../types'
import { getFilteredRecipes } from '../../functions/filter'
import { fetchUsers } from '../../app/calls/users'
import { fetchRecipes } from '../../app/calls/recipes'
import RecipesPageStyled from './RecipesPageStyled'
import Filter from '../../features/filter'
import Pagination from '../../features/pagination'
import Loading from '../../components/loading'

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<IUser[]>([])

  const [filters, setFilters] = useState<IFilter[]>([])
  const [filterOpen, setFilterOpen] = useState(true)

  useEffect(() => {
    fetchRecipes(false)
      .then(r => setRecipes(r))
      .then(() => fetchUsers().then(u => setUsers(u)))
      .then(() => setLoading(false))
      .catch(e => console.log(e))
  }, [])

  const getRecipes = () => {
    const filteredRecipes = getFilteredRecipes(recipes, filters)
    const finalRecipes = filteredRecipes.slice(
      indexOfFirstCourse,
      indexOfLastCourse
    )

    return finalRecipes
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 12
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage

  if (loading) return <Loading />

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
        <Pagination
          coursesAmount={getFilteredRecipes(recipes, filters).length}
          coursesPerPage={coursesPerPage}
          currentPage={currentPage}
          setPage={setCurrentPage}
        />
      </RecipesPageStyled>
    </Layout>
  )
}

export default RecipesPage
