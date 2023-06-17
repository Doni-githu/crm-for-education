import React, { useEffect } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../LogIn/LogIn'
import { Routes, Route, useLocation, useNavigation, useNavigate } from 'react-router-dom'
function App() {
  const router = useNavigate()
  // useEffect(() => {
  //   router('/login')
  // }, [])
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}


export default App