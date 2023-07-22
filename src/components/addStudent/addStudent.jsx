import Input from "../../uiComponents/Input/Input"
import React, { useEffect, useState } from 'react'
import './addStudent.scss'
import Technology from "../../services/technology"
import Profession from "../../services/profession"
import Mentors from "../../services/mentor"
import Auth from "../../services/user"
import { Navigate } from "react-router-dom"

export default function AddStudent() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mentors, setMentors] = useState([])
  const [professions, setProfessions] = useState([])
  const [technology, setTechnology] = useState([])
  const [phone, setPhone] = useState('')
  const [file, setFile] = useState({})
  const [error, setError] = useState('')
  useEffect(() => {
    Mentors.all()
      .then((res) => {
        const newResponse = res.data.map(item => ({
          ...item,
          active: false
        }))
        setMentors(newResponse)
      })
    Profession.all()
      .then((res) => {
        const newResponse = res.data.map(item => ({
          ...item,
          active: false
        }))
        setProfessions(newResponse)
      })
    Technology.all()
      .then(res => {
        const newResponse = res.data.map(item => ({
          ...item,
          active: false
        }))
        setTechnology(newResponse)
      })
  }, [])

  const addStudentMain = () => {
    if (!name || !surname || !password || !username || technology.length === 0 || professions.length === 0 || mentors.length === 0 || !phone) {
      setError('All fields are required')
      return
    }
    const professions_id = professions.filter((item) => item.active).map((item) => Number(item.id))
    const mentors_id = mentors.filter((item) => item.active).map((item) => Number(item.id))
    const technologies_id = technology.filter(c => c.active).map((item) => Number(item.id))



    const data = {
      name,
      surname,
      username,
      technologies_id,
      teachers_id: mentors_id,
      profession_id: professions_id,
      password,
      phone: parseInt(phone.replace('+', '')),
      davomat: [],
    }


    Auth.make(data)
      .then((res) => {
        Navigate({ to: '/groups' })
      }).catch((err) => {
        console.log(err)
      })
  }
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
    if (type === "teach") {
      setMentors(newArray)
      return
    }
  }
  return (
    <div className='add-container'>
      <div className="title">
        <p>Add Student</p>
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
        <div className="form-block one">
          <Input type="tel" state={phone} setState={setPhone} placeholder={'Telefon raqamni kiriting'} />
          <div className="hover-pagination-form">
            <p className="label">Professions: </p>
            <ul className="pagination-hover">
              {professions ? professions.map(item => (
                <li key={item.id} onClick={() => changeVisibled(professions, item.id, 'pro')} className={item.active ? 'active' : ''}>{item.name}</li>
              )) : null}
            </ul>
          </div>
        </div>
        <div className="form-grid">

          <div className="hover-pagination-form">
            <p className="label">Technologies: </p>
            <ul className="pagination-hover">
              {technology ? technology.map(item => (
                <li key={item.id} onClick={() => changeVisibled(technology, item.id, 'tech')} className={item.active ? 'active' : ''}>{item.name}</li>
              )) : null}
            </ul>
          </div>
          <div className="hover-pagination-form">
            <p className="label">Teachers: </p>
            <ul className="pagination-hover">
              {mentors ? mentors.map(item => (
                <li key={item.id} onClick={() => changeVisibled(mentors, item.id, 'teach')} className={item.active ? 'active' : ''}>{item.name} {item.surname}</li>
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
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
