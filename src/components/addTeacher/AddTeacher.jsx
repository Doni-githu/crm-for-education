import Input from "../../uiComponents/Input/Input"
import React, { useEffect, useState } from 'react'
import '../addStudent/addStudent.scss'
import Technology from "../../services/technology"
import Profession from "../../services/profession"
import Mentor from "../../services/mentor"
import { useNavigate } from "react-router-dom"
export default function AddTeacher() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [professions, setProfessions] = useState([])
  const [professionId, setProfessionId] = useState([])
  const [error, setError] = useState('')
  const [salary, setSalary] = useState()
  const changeProfession = (selected) => {
    setProfessionId(new Array(...selected).map(item => parseInt(item.value)))
  }
  const navigate = useNavigate()
  const addStudentMain = () => {
    if (!name || !surname || !salary) {
      setError("All fields are required")
      return
    }
    const technologiesData = professions.filter(c => professionId.includes(c.id))
    const technologiesIds = []

    for (let i = 0; i < technologiesData.length; i++) {
      const element = technologiesData[i];
      for (let j = 0; j < element.technologies.length; j++) {
        const element2 = element.technologies[j];
        technologiesIds.push(element2.id)
      }
    }

        



    const data = {
      name,
      surname,
      salary,
      profession_id: professionId,
      technologies_id: technologiesIds,
      username,
      password
    }


    Mentor.create(data)
      .then((res) => {
        navigate('/teachers')
      }).catch((err) => {
        console.log(err);
      })
  }


  useEffect(() => {
    Profession.all()
      .then((res) => {
        if (res.data.length !== 0) {
          const filtered = res.data.map((item) => ({
            ...item,
            active: false
          }))
          filtered[0].active = true
          setProfessions(filtered)
        }
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
          <div className="select-container">
            <select multiple onChange={(e) => changeProfession(e.target.selectedOptions)}>
              {professions.length !== 0 ? professions?.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              )) : null}
            </select>
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
