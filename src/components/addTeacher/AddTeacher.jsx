import Input from "../../uiComponents/Input/Input"
import React, { useEffect, useState } from 'react'
import '../addStudent/addStudent.scss'
import Technology from "../../services/technology"
import './AddTeacher.scss'
import Profession from "../../services/profession"
import Mentor from "../../services/mentor"
import { Navigate } from "react-router-dom"
export default function AddTeacher() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [professions, setProfessions] = useState([])
  const [technology, setTechnology] = useState([])
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [salary, setSalary] = useState()
  const changeVisibled = (array, id, type) => {
    const newArray = array.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          active: !item.active
        }
      }
      return item
    })
    if (type === "tech") {
      setTechnology(newArray)
      return
    }
    if (type === "pro") {
      setProfessions(newArray)
      return
    }
  }
  const addStudentMain = () => {
    if (!name || !surname || !salary || technology.length === 0 || professions.length === 0) {
      setError("All fields are required")
      return
    }

    const technologies_id = technology.filter(c => c.active).map(c => c.id)
    const profession_id = professions.filter(c => c.active).map(c => c.id)

    const data = {
      name,
      surname,
      salary,
      technologies_id,
      profession_id,
      username,
      password
    }
    Mentor.create(data)
      .then((res) => {
        Navigate({ to: '/groups' })
      }).catch((err) => {
        console.log(err);
      })
  }


  useEffect(() => {
    Technology.all()
      .then((res) => {
        const filtered = res.data.map((item) => ({
          ...item,
          active: false
        }))
        setTechnology(filtered)
      })
    Profession.all()
      .then((res) => {
        const filtered = res.data.map((item) => ({
          ...item,
          active: false
        }))
        setProfessions(filtered)
      })
  }, [])
  return (
    <div className='add-container'>
      <div className="title">
        <p>Add Teacher</p>
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-block">
          <Input state={name} setState={setName} placeholder={'Ism kiriting'} />
          <Input state={surname} setState={setSurname} placeholder={'Familiya kiriting'} />
        </div>
        <div className="form-block">
          <Input state={username} setState={setUsername} placeholder={'User name kiriting'} />
          <Input type="password" state={password} setState={setPassword} placeholder={'Parol kiriting'} />
        </div>
        <div className="form-grid second">
          <Input type="number" state={salary} setState={setSalary} placeholder={"O'qituvchi maoshini kiriting"} />
          <div className="hover-pagination-form">
            <p className="label">Professions: </p>
            <ul className="pagination-hover">
              {professions ? professions.map(item => (
                <li key={item.id} onClick={() => changeVisibled(professions, item.id, 'pro')} className={item.active ? 'active' : ''}>{item.name}</li>
              )) : null}
            </ul>
          </div>
          <div className="hover-pagination-form">
            <p className="label">Technologies: </p>
            <ul className="pagination-hover">
              {technology ? technology.map(item => (
                <li key={item.id} onClick={() => changeVisibled(technology, item.id, 'tech')} className={item.active ? 'active' : ''}>{item.name}</li>
              )) : null}
            </ul>
          </div>
        </div>
        <div className="btn-container">
          <div className="btn">
            <button onClick={addStudentMain}>
              <div className="img">
                <i className="fa-solid fa-plus"></i>
              </div>
              <span>Add Teacher</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
