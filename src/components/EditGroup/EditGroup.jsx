import React, { useEffect, useInsertionEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Group from '../../services/groups'
import Mentor from '../../services/mentor'
import Auth from '../../services/user'

import Technology from '../../services/technology'
import Input from '../../uiComponents/Input/Input'
import DavomatReq from '../../services/davomat'
import './EditGroup.scss'

export default function EditGroup({ id }) {
    const [name, setName] = useState('')
    const [beginDate, setBeginDate] = useState('')
    const [completeDate, setCompleteDate] = useState('')
    const [whenStart, setWhenStart] = useState('')
    const [price, setPrice] = useState()
    const [weekDays, setWeekDays] = useState([])
    const [technologies, setTechnologies] = useState([])
    const [mentors, setMentors] = useState([])
    const [students, setStudents] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        Group.getOne(id)
            .then((res) => {
                setName(res.data.name)
                setBeginDate(res.data.begin_date)
                setCompleteDate(res.data.complete_date)
                setWhenStart(res.data.when_start)
                setPrice(res.data.price)
                const filteredStudent = res.data.students.map(item => item.id)
                const filteredMentors = res.data.teacher.id
                const filteredTechnologies = res.data.technologies.map(item => item.id)
                const filteredWeekDays = res.data.week_days.map((item) => item.id)
                Mentor.all()
                    .then(res => {
                        const newRes = res.data.map(item => {
                            if (filteredMentors === item.id) {
                                return {
                                    ...item,
                                    active: true
                                }
                            }
                            return item
                        })
                        setMentors(newRes)
                    })
                Auth.all()
                    .then((res) => {
                        const newRes = res.data.map((item) => {
                            if (filteredStudent.includes(item.id)) {
                                return {
                                    ...item,
                                    active: true
                                }
                            }
                            return item
                        })
                        setStudents(newRes)
                    })
                Technology.allWeekDays()
                    .then(res => {
                        const newRes = res.data.map((item) => {
                            if (filteredWeekDays.includes(item.id)) {
                                return {
                                    ...item,
                                    active: true
                                }
                            }
                            return item
                        })
                        setWeekDays(newRes)
                    })

                Technology.all()
                    .then(res => {
                        const newRes = res.data.map((item) => {
                            if (filteredTechnologies.includes(item.id)) {
                                return {
                                    ...item,
                                    active: true
                                }
                            }
                            return item
                        })
                        setTechnologies(newRes)
                    })
            })
            .catch((err) => console.log(err))
    }, [])
    const navigate = useNavigate()



    const editStudentMain = async () => {
        if (!name ||
            !price ||
            !completeDate ||
            !beginDate ||
            !whenStart ||
            technologies.filter(c => c.active).length === 0 ||
            weekDays.filter(c => c.active).length === 0 ||
            students.filter(c => c.active).length === 0 ||
            mentors.filter(c => c.active).length === 0
        ) {
            setError('All fields are required!')
            return
        }
        const technologies_id = technologies.filter(c => c.active).map(c => c.id)
        const week_days_id = weekDays.filter(c => c.active).map(c => c.id)
        const students_id = students.filter(c => c.active).map(c => c.id).length === 0 ? [] : students.filter(c => c.active).map(c => c.id)
        const teacher = mentors.find(c => c.active).id


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

        Group.edit(id, data)
            .then((res) => {
                navigate(`/groups`)
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    const changeVisibled = (data, id, type) => {
        if (type === "teach") {
            const newDate = data.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        active: true
                    }
                }
                return {
                    ...item,
                    active: false
                }
            })
            setMentors(newDate)
        }
        const newArray = data.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    active: !item.active
                }
            }
            return item
        })
        if (type === "tech") {
            setTechnologies(newArray)
            return
        }
        if(type === "student"){
            setStudents(newArray)
            return
        }
    }
    return (
        <div className='add-container'>
            <div className="title">
                <p>Edit Group {name}</p>
            </div>
            <form onSubmit={e => e.preventDefault()}>
                <div className="form-block">
                    <Input state={name} setState={setName} placeholder={'Ism kiriting'} />
                    <Input type={"number"} id={"some"} state={price} setState={setPrice} placeholder={'Price'} />
                </div>
                <div className="form-block">
                    <Input id={'some1'} type='date' label={'Begin start'} state={beginDate} setState={setBeginDate} />
                    <Input id={'some2'} type={"date"} label={'Complete'} state={completeDate} setState={setCompleteDate} />
                    <Input id={'some3'} type={"time"} label={'When start'} state={whenStart} setState={setWhenStart} />
                </div>
                <div className="form-grid change">
                    <div className="hover-pagination-form">
                        <p className="label">Technologies: </p>
                        <ul className='pagination-hover'>
                            {technologies.map((item) => (
                                <li onClick={() => changeVisibled(technologies, item.id, "tech")} className={item.active ? 'active' : ''} value={item.id} key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="hover-pagination-form">
                        <p className="label">Teachers: </p>
                        <ul className='pagination-hover'>
                            {mentors.length !== 0 ? mentors.map((item) => (
                                <li onClick={() => changeVisibled(mentors, item.id, "teach")} className={item.active ? 'active' : ''} value={item.id} key={item.id}>{item.name} {item.surname}</li>
                            )) : null}
                        </ul>
                    </div>

                    <div className="hover-pagination-form">
                        <p className='label'>Students: </p>
                        <ul className='pagination-hover'>
                            {students.map((item) => (
                                <li onClick={() => changeVisibled(students, item.id, "student")} className={item.active ? 'active' : ''} value={item.id} key={item.id}>{item.name} {item.surname}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="hover-pagination-form">
                        <p className="label">Week days:</p>
                        <ul className='pagination-hover'>
                            {weekDays.map((item) => (
                                <li className={item.active ? 'active' : ''} value={item.id} key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="btn-container">
                    <div className="btn">
                        <button onClick={editStudentMain}>
                            <div className="img">
                                <i className="fa-solid fa-edit"></i>
                            </div>
                            <span>Edit Group</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
