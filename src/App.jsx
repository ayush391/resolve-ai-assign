import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { Container } from '@mui/material'
import Login from './assets/components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxWidth='md'>
      <Login />
    </Container>
  )
}

export default App
