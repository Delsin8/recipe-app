import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Test } from './components/Test'
import theme from './Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Test />
    </ThemeProvider>
  )
}

export default App
