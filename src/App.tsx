import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './styles/Theme'
import RecipePage from './pages/Recipe/RecipePage'
import GlobalStyles from './styles/GlobalStyles'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import RecipesPage from './pages/Recipes/RecipesPage'
import UserPage from './pages/User/UserPage'
import CommentsPage from './pages/Comments/CommentsPage'
import NotificationsPage from './pages/Notifications/NotificationsPage'
import HomePage from './pages/Home/HomePage'
import SigninPage from './pages/Auth/SigninPage'
import SignupPage from './pages/Auth/SignupPage'
import CreateRecipePage from './pages/CreateRecipe/CreateRecipePage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/create" element={<CreateRecipePage />} />
        <Route path="/comments/:id" element={<CommentsPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
