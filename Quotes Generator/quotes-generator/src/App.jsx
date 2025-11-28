import React from 'react'

import Login from '../src/pages/Login.jsx'

import Services from '../src/pages/Services.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App(){

  return(

    <BrowserRouter>
    <Routes>
      <Route element={<Login/>} path='/'>
        Home
      </Route>
      <Route element={<Services/>} path='/services'>
        Services
      </Route>
    </Routes>
    
    </BrowserRouter>
  )
}
export default App