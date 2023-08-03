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
                if (res.data.profession.length && res.data.teachers.length) {
                    const filteredProfessions = res.data.profession.map(c => c.id)
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
                }
            })
    }, [])

    const editMain = () => {
        if (!name || !surname || professions.filter(c => c.active).length === 0 || teachers.filter(c => c.active).length === 0 || !phone) {
            setError('All fields are required')
            return
        }

        const professions_id = professions.filter((item) => item.active).map((item) => Number(item.id))
        const mentors_id = teachers.filter((item) => item.active).map((item) => Number(item.id))

        const data = {
            name,
            surname,
            teachers_id: mentors_id,
            profession_id: professions_id,
            phone: parseInt(phone.replace('+', '')),
            davomat: user.davomat,
        }
        Auth.edit(id, data)
            .then(res => {
                navigate(`/profile/${id}`)
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
            </div>
            <form onSubmit={e => e.preventDefault()}>
                <div className="form-block">
                    <Input state={name} setState={setName} placeholder={'Ism kiriting'} />
                    <Input state={surname} setState={setSurname} placeholder={'Familiya kiriting'} />
                    <Input type="tel" state={phone} setState={setPhone} placeholder={'Telefon raqamni kiriting'} />
                </div>
                <div className="form-grid">
                    <div className="hover-pagination-form">
                        <p className="label">Professions: </p>
                        <ul className="pagination-hover">
                            {professions ? professions.map(item => (
                                <li key={item.id} onClick={() => changeVisibled(professions, item.id, 'pro')} className={item.active ? 'active' : ''}>{item.name}</li>
                            )) : null}
                        </ul>
                    </div>
                    <div className="hover-pagination-form">
                        <p className="label">Teachers: </p>
                        <ul className="pagination-hover">
                            {teachers.length !== 0 ? teachers.map(item => (
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
