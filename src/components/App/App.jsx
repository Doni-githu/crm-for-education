import React, { useContext, useEffect } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../LogIn/LogIn'
import { Routes, Route } from 'react-router-dom'
import Groups from '../Groups/Groups'
import Payment from '../Payment/Payment'
import Salary from '../Salary/Salary'
import Davomat from '../Davomat/Davomat'
import Profile from '../Profile/Profile'
import TeacherProfile from '../TeacherProfile/TeacherProfile'
import Auth from '../../services/user'
import AddUser from '../addUser/addUser'
import { context } from '../../provider/provider'
function App() {
  const { state, dispatch } = useContext(context)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch({ type: 'startlogin' })
      Auth.getUser(token)
        .then((res) => {
          const payload = {
            user: res.data.user,
            role: res.data.role
          }
          dispatch({ type: 'user/login', payload })
        })
    }
  }, [])

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
      <Route path="/add/:what" element={<AddUser />} />
    </Routes >
  )
}


export default App