import React, { useContext, useEffect, useState } from 'react'
import './EditStudent.scss'
import Input from '../../uiComponents/Input/Input'
import Auth from '../../services/user'
import Technology from '../../services/technology'
import Profession from '../../services/profession'
import Mentor from '../../services/mentor'
import { useNavigate } from 'react-router-dom'
import { context } from '../../provider/provider'
export default function EditStudent({ id }) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [professions, setProfessions] = useState([])
    const [technologies, setTechnologies] = useState([])
    const [teachers, setTeachers] = useState([])
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { state } = useContext(context)
    useEffect(() => {
        Auth.getOne(id)
            .then(res => {
                setUser(res.data)
                setName(res.data.name)
                setSurname(res.data.surname)
                setUsername(res.data.username)
                setPassword(res.data.password)
                setPhone(`+${res.data.phone}`)
                const filteredProfessions = res.data.profession.map(c => c.id)
                const filteredTechnologies = res.data.technologies.map(c => c.id)
                const filteredTeachers = res.data.teachers.map(c => c.id)

                Mentor.all()
                    .then(res => {
                        const newRes = res.data.map(item => {
                            if (filteredTeachers.includes(item.id)) {
                                return {
                                    ...item,
                                    active: true
                                }
                            }
                            return item
                        })
                        setTeachers(newRes)
                    })
                Technology.all()
                    .then(res => {
                        const newRes = res.data.map(item => {
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
                Profession.all()
                    .then(res => {
                        const newRes = res.data.map(item => {
                            if (filteredProfessions.includes(item.id)) {
                                return {
                                    ...item,
                                    active: true
                                }
                            }
                            return item
                        })
                        setProfessions(newRes)
                    })
            })
    }, [])

    const editMain = () => {
        if (!name || !surname || !password || !username || technologies.filter(c => c.active).length === 0 || professions.filter(c => c.active).length === 0 || teachers.filter(c => c.active).length === 0 || !phone) {
            setError('All fields are required')
            return
        }

        const professions_id = professions.filter((item) => item.active).map((item) => Number(item.id))
        const mentors_id = teachers.filter((item) => item.active).map((item) => Number(item.id))
        const technologies_id = technologies.filter(c => c.active).map((item) => Number(item.id))

        const data = {
            name,
            surname,
            username,
            technologies_id,
            teachers_id: mentors_id,
            profession_id: professions_id,
            password,
            phone: parseInt(phone.replace('+', '')),
            davomat: user.davomat
        }
        Auth.edit(id, data)
            .then(res => {
                navigate('/salary')
            })
    }
    const changeVisibled = (data, id, type) => {
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
        if (type === "pro") {
            setProfessions(newArray)
            return
        }
        if (type === "teach") {
            setTeachers(newArray)
            return
        }
    }
    return (
        <div className='add-container'>
            <div className="title">
                <p>Edit Student</p>
                {state}
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
                            {technologies ? technologies.map(item => (
                                <li key={item.id} onClick={() => changeVisibled(technologies, item.id, 'tech')} className={item.active ? 'active' : ''}>{item.name}</li>
                            )) : null}
                        </ul>
                    </div>
                    <div className="hover-pagination-form">
                        <p className="label">Teachers: </p>
                        <ul className="pagination-hover">
                            {teachers ? teachers.map(item => (
                                <li key={item.id} onClick={() => changeVisibled(teachers, item.id, 'teach')} className={item.active ? 'active' : ''}>{item.name} {item.surname}</li>
                            )) : null}
                        </ul>
                    </div>
                </div>
                <div className="btn-container">
                    <div className="btn">
                        <button onClick={editMain}>
                            <div className="img">
                                <i className="fa-solid fa-edit"></i>
                            </div>
                            <span>Edit Student</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
