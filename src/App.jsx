import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { Container } from '@mui/material'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from './assets/components/Login'
import Navbar from './assets/components/Navbar'
import Add from './assets/components/Add'
import Manage from './assets/components/Manage'

function App() {

  return (
    <HashRouter>
      <Navbar />
      <Container maxWidth='md'>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/add' element={<Add />} />
          <Route exact path='/manage' element={<Manage />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
