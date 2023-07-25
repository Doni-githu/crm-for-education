import Input from "../../uiComponents/Input/Input"
import React, { useEffect, useState } from 'react'
import '../addStudent/addStudent.scss'
import Technology from "../../services/technology"
import '../addTeacher/AddTeacher.scss'
import Profession from "../../services/profession"
import Mentor from "../../services/mentor"
import { useNavigate, useParams } from "react-router-dom"
export default function EditTeacher() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [professions, setProfessions] = useState([])
    const [technology, setTechnology] = useState([])
    const [error, setError] = useState('')
    const [salary, setSalary] = useState()
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        Mentor.getOne(params.id)
            .then((res) => {
                setName(res.data.name)
                setSurname(res.data.surname)
                setSalary(res.data.salary)
                setUsername(res.data.username)
                setPassword(res.data.password)
                const IdTech = res.data.technologies.map(c => c.id)
                const IdPro = res.data.profession.map(c => c.id)

                Technology.all()
                    .then((res2) => {
                        const newRes = res2.data.map(item => {
                            if (IdTech.includes(item.id)) {
                                return {
                                    ...item,
                                    active: true
                                }
                            }
                            return item
                        })
                        setTechnology(newRes)
                    })
                Profession.all()
                    .then((res2) => {
                        const newRes = res2.data.map(item => {
                            if (IdPro.includes(item.id)) {
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
        if (!name || !surname || !salary || technology.filter(c => c.active).length === 0 || professions.filter(c => c.active) === 0) {
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
        Mentor.edit(parseInt(params.id), data)
            .then((res) => {
                navigate('/teachers')
            }).catch((err) => {
                console.log(err);
            })
    }


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
                                <i className="fa-solid fa-edit"></i>
                            </div>
                            <span>Edit Teacher</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
