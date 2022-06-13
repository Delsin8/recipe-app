import { ThemeProvider } from 'styled-components'
import theme from './styles/Theme'
import RecipePage from './pages/Recipe/RecipePage'
import GlobalStyles from './styles/GlobalStyles'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import RecipesPage from './pages/Recipes/RecipesPage'
import UserPage from './pages/User/UserPage'
import CommentsPage from './pages/Comments/CommentsPage'
import ActivitiesPage from './pages/Activities/ActivitiesPage'
import HomePage from './pages/Home/HomePage'
import SigninPage from './pages/Auth/SigninPage'
import SignupPage from './pages/Auth/SignupPage'
import CreateRecipePage from './pages/CreateRecipe/CreateRecipePage'
import NotFoundPage from './pages/404/NotFoundPage'
import CollectionPage from './pages/Collection/CollectionPage'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/recipe/:id/comments" element={<CommentsPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/create" element={<CreateRecipePage />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        {/* <Route path="/user" element={<UserPage />} /> */}
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/activities/:id" element={<ActivitiesPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
