import React, { useEffect, useState } from 'react'
import '../addStudent/addStudent.scss'
import Group from '../../services/groups'
import Auth from '../../services/user'
import Technology from '../../services/technology'
import Mentor from '../../services/mentor'
import './AddGroup.scss'
import Input from '../../uiComponents/Input/Input'
import { useNavigate } from 'react-router-dom'
export default function AddGroup() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState()
  const [weekDays, setWeekDays] = useState([])
  const [beginDate, setBeginDate] = useState('')
  const [whenStart, setWhenStart] = useState('')
  const [completeDate, setCompleteDate] = useState('')
  const [technologies, setTechnologies] = useState([])
  const [students, setStudents] = useState([])
  const [mentors, setMentors] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    Auth.all()
      .then((res) => {
        const newRes = res.data.map((item) => ({
          ...item,
          active: false
        }))
        setStudents(newRes)
      })
    Mentor.all()
      .then((res) => {
        const newRes = res.data.map((item) => ({
          ...item,
          active: false
        }))
        setMentors(newRes)
      })
    Technology.all()
      .then((res) => {
        const newRes = res.data.map((item) => ({
          ...item,
          active: false
        }))
        setTechnologies(newRes)
      })

    Technology.allWeekDays()
      .then((res) => {
        const newRes = res.data.map(item => ({
          ...item,
          active: false
        }))
        setWeekDays(newRes)
      })
  }, [])

  const changeVisibled = (data, id, type) => {
    if (type === "teach") {
      const newStudents = data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            active: true
          }

        }
        return { ...item, active: false }
      })
      setMentors(newStudents)
    }

    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          active: !item.active,
        }
      }
      return item
    })

    if (type === "tech") {
      setTechnologies(newData)
    }
    if (type === "student") {
      setStudents(newData)
    }

    if (type === "week") {
      setWeekDays(newData)
    }
  }

  const addGroupMain = () => {
    if (!completeDate || !beginDate || students.length === 0 || mentors.length === 0 || technologies.length === 0 || !whenStart || !price || !name) {
      setError("All fields are required")
      return
    }
    const technologies_id = technologies.filter(c => c.active).map((c) => Number(c.id))
    const week_days_id = weekDays.filter(c => c.active).map((c) => Number(c.id))
    const students_id = students.filter(c => c.active).map(c => Number(c.id))
    const teacher = Number(mentors.find(c => c.active).id)

    const data = {
      technologies_id,
      week_days_id,
      students_id,
      teacher,
      begin_date: beginDate,
      when_start: whenStart,
      complete_date: completeDate,
      name,
      price
    }

    Group.make(data)
      .then((res) => {
        navigate('/groups')
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='add-container'>
      <div className="title">
        <p>Add Group</p>
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-block">
          <Input state={name} setState={setName} placeholder={'Ism kiriting'} />
          <Input type={"number"} id={"some"} state={price} setState={setPrice} placeholder={'Price'} />
        </div>
        <div className="form-block">
          <Input type='date' label={'Begin start'} state={beginDate} setState={setBeginDate} />
          <Input type={"date"} label={'Complete'} state={completeDate} setState={setCompleteDate} />
          <Input type={"time"} label={'When start'} state={whenStart} setState={setWhenStart} />
        </div>
        <div className="form-grid change">
          <div className="hover-pagination-form">
            <p className="label">Technologies: </p>
            <ul className="pagination-hover">
              {technologies ? technologies.map(item => (
                <li key={item.id} onClick={() => changeVisibled(technologies, item.id, 'tech')} className={item.active ? 'active' : ''}>{item.name}</li>
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
          <div className="hover-pagination-form">
            <p className="label">Students: </p>
            <ul className="pagination-hover">
              {students ? students.map(item => (
                <li key={item.id} onClick={() => changeVisibled(students, item.id, 'student')} className={item.active ? 'active' : ''}>{item.name}</li>
              )) : null}
            </ul>
          </div>
          <div className="hover-pagination-form">
            <p className="label">Week days: </p>
            <ul className="pagination-hover">
              {weekDays ? weekDays.map(item => (
                <li key={item.id} onClick={() => changeVisibled(weekDays, item.id, 'week')} className={item.active ? 'active' : ''}>{item.name} {item.surname}</li>
              )) : null}
            </ul>
          </div>
        </div>
        <div className="btn-container">
          <div className="btn">
            <button onClick={addGroupMain}>
              <div className="img">
                <i className="fa-solid fa-plus"></i>
              </div>
              <span>Add Group</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
