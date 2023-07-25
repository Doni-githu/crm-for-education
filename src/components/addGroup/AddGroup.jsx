import React, { useEffect, useState } from 'react'
import '../addStudent/addStudent.scss'
import Group from '../../services/groups'
import Auth from '../../services/user'
import Technology from '../../services/technology'
import Mentor from '../../services/mentor'
import './AddGroup.scss'
import Input from '../../uiComponents/Input/Input'
import { useNavigate } from 'react-router-dom'
import DavomatReq from '../../services/davomat'
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
  const [mentor, setMentor] = useState()
  const [technologiesId, setTechnologiesId] = useState([])
  const [weekDaysId, setWeekDaysId] = useState([])
  const [studentsId, setStudentsId] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    Auth.all()
      .then((res) => {
        setStudents(res.data)
      })
    Mentor.all()
      .then((res) => {
        if (res.data.length !== 0) {
          setMentor(res.data[0].id)
          setMentors(res.data)
        }
      })
    Technology.all()
      .then((res) => {
        setTechnologies(res.data)
      })

    Technology.allWeekDays()
      .then((res) => {
        setWeekDays(res.data)
      })
  }, [])

  const changeHandler = (selected, type) => {
    if (type === "tech") {
      setTechnologiesId(new Array(...selected).map(c => Number(c.value)))
    }
    if (type === "week") {
      setWeekDaysId(new Array(...selected).map(c => Number(c.value)))
    }
    if (type === "student") {
      setStudentsId(new Array(...selected).map(c => Number(c.value)))
    }
  }


  const addGroupMain = async () => {
    if (!completeDate || !beginDate || !whenStart || !price || !name) {
      setError("All fields are required")
      return
    }
    const technologies_id = technologies.filter(c => c.active).map((c) => Number(c.id))
    const week_days_id = weekDays.filter(c => c.active).map((c) => Number(c.id))
    const students_id = students.filter(c => c.active).map(c => Number(c.id))
    const start = Date.parse(beginDate)
    let startBegin = new Date(beginDate);
    const end = Date.parse(completeDate)
    const days = Math.round((end - start) / 1000 / 60 / 60 / 24)
    // for (let i = 0; i < students_id.length; i++) {
    //   const element = students_id[i];
    //   for (let j = 0; j < days; j++) {
    //     startBegin.setDate(startBegin.getDate() + j)
    //     let date = startBegin.toString().slice(0, 15)
    //     if (weekDays.filter(c => c.active).map((item) => item.name).includes(date.slice(0, 3))) {
    //       let data = {
    //         keldi: 'e',
    //         student: element,
    //         sana: date
    //       }
    //       await DavomatReq.create(data)
    //     }
    //   }
    //   startBegin = new Date(beginDate)
    // }
    const data = {
      technologies_id: technologiesId,
      week_days_id: weekDaysId,
      students_id: studentsId,
      teacher: mentor,
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
          <select onChange={(e) => changeHandler(e.target.selectedOptions, "tech")} multiple>
            {technologies.length !== 0 ? technologies.map(item => (
              <option value={item.id} key={item.id}>{item.name}</option>
            )) : null}
          </select>
          <select onChange={(e) => setMentor(Number(e.target.value))}>
            {mentors.length !== 0 ? mentors.map(item => (
              <option value={item.id} key={item.id}>{item.name} {item.surname}</option>
            )) : null}
          </select>
          <select onChange={(e) => changeHandler(e.target.selectedOptions, "student")} multiple>
            {students.length !== 0 ? students.map(item => (
              <option value={item.id} key={item.id}>{item.name} {item.surname}</option>
            )) : null}
          </select>
          <select onChange={(e) => changeHandler(e.target.selectedOptions, "week")} multiple>
            {weekDays.length !== 0 ? weekDays.map(item => (
              <option value={item.id} key={item.id}>{item.name}</option>
            )) : null}
          </select>
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
