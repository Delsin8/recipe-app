import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './styles/Theme'
import RecipePage from './pages/Recipe/RecipePage'
import GlobalStyles from './styles/GlobalStyles'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import RecipesPage from './pages/Recipes/RecipesPage'
import UserPage from './pages/User/UserPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
