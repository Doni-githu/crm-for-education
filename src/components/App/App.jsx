import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../LogIn/LogIn'
import { Routes, Route } from 'react-router-dom'
import Groups from '../Groups/Groups'
import Payment from '../Payment/Payment'
import Salary from '../Salary/Salary'
import Davomat from '../Davomat/Davomat'
import Profile from '../Profile/Profile'
import TeacherProfile from '../TeacherProfile/TeacherProfile'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/groups' element={<Dashboard />} />
      <Route path='/payments' element={<Payment />} />
      <Route path='/salary' element={<Salary />} />
      <Route path='/attendance/:id' element={<Davomat />} />
      <Route path='/teachers' element={<Groups />} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/teacher/:id' element={<TeacherProfile />} />
    </Routes>
  )
}


export default App