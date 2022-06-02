import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './styles/Theme'
import RecipePage from './pages/Recipe/RecipePage'
import GlobalStyles from './styles/GlobalStyles'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
