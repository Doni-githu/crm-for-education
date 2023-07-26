import Input from "../../uiComponents/Input/Input"
import React, { useEffect, useState } from 'react'
import './addStudent.scss'
import Technology from "../../services/technology"
import Profession from "../../services/profession"
import Mentors from "../../services/mentor"
import Auth from "../../services/user"
import { useNavigate } from "react-router-dom"

export default function AddStudent() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mentors, setMentors] = useState([])
  const [professions, setProfessions] = useState([])
  const [technology, setTechnology] = useState([])
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [professionsId, setProfessionsId] = useState([])
  useEffect(() => {
    Mentors.all()
      .then((res) => {
        if (res.data.length !== 0) {
          const newResponse = res.data.map(item => ({
            ...item,
            active: false
          }))
          newResponse[0].active = true
          setMentors(newResponse)
        }
      })
    Profession.all()
      .then((res) => {
        setProfessions(res.data)
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
  const navigate = useNavigate()

  const addStudentMain = () => {
    if (!name || !surname || !password || !username || technology.length === 0 || professions.length === 0 || mentors.length === 0 || !phone) {
      setError('All fields are required')
      return
    }
    const mentors_id = mentors.filter((item) => item.active).map((item) => Number(item.id))
    const proTech = professions.filter(c => professionsId.includes(c.id))
    const ids = []

    for (let i = 0; i < proTech.length; i++) {
      const element = proTech[i];
      for (let i = 0; i < element.technologies.length; i++) {
        const element2 = element.technologies[i];
        ids.push(element2.id)
      }
    }



    const data = {
      name,
      surname,
      technologies_id: ids,
      teachers_id: mentors_id,
      profession_id: professionsId,
      phone: parseInt(phone.replace('+', '')),
      davomat: [],
    }

    Auth.make(data)
      .then((res) => {
        navigate('/salary')
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
    if (type === "teach") {
      setMentors(newArray)
      return
    }
  }

  const changeMulti = (selected) => {
    setProfessionsId(new Array(...selected).map((item) => Number(item.value)))
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
        <div className="form-grid change2">
          <Input type="tel" state={phone} setState={setPhone} placeholder={'Telefon raqamni kiriting'} />
          <div className="select-container">
            <label>Teacher: </label>
            <select>
              {mentors.length !== 0 ? mentors?.map(item => (
                <option key={item.id} value={item.id}>{item.name} {item.surname}</option>
              )) : null}
            </select>
          </div>
          <div className="select-container">
            <select id="professions" multiple onChange={(e) => changeMulti(e.target.selectedOptions)}>
              {professions.length !== 0 ? professions?.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              )) : null}
            </select>
            <label>Bir nechtasini tanlash uchun Mac-dagi "Command" yoki "Control" ni ushlab turing.</label>
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
