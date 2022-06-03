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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
