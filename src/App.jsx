import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { Container, CssBaseline } from '@mui/material'
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './assets/components/Login'
import Navbar from './assets/components/Navbar'
import Add from './assets/components/Add'
import Manage from './assets/components/Manage'
import Logout from './assets/components/Logout'
import { app } from './firebase'
import { getAuth } from 'firebase/auth'

function App() {

  return (
    <HashRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth='xl'>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/add' element={<Add />} />
          <Route exact path='/manage' element={<Manage />} />
          <Route exact path='/logout' element={<Logout />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
