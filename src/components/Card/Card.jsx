import React, { useEffect, useState } from 'react'
import './Card.scss'
import { useNavigate } from 'react-router-dom'
import Groups from "../../services/groups"
import User from "../../services/user"

function Card({ item }) {
    const [students, setStudents] = useState(0)
    const [groups, setGroups] = useState(0)
    const navigate = useNavigate()

    const toProfile = id => {
        navigate(`/teacher/${id}`)
    }

    useEffect(() => {
        Groups.all()
            .then((res) => {
                const groupsLength = res.data.filter(c => c.teacher.id === item.id).length;
                setGroups(groupsLength)
            })
        User.all()
            .then((res) => {
                const studentsLength = res.data.filter(c => c.teachers.filter(h => h.id === item.id)).length
                setStudents(studentsLength)
            })
    }, [])


    return (
        <div className='card'>
            <div className="card-top">
                <div className='card-bottom-profile'>
                    <strong className='mentor-name'>{item.name} {item.surname}</strong>
                </div>
                <div className='card-bottom-profile'>
                    <p>{item.professional}</p>
                    <div className='card-btn'>
                        <button onClick={() => toProfile(item.id)}>Profile</button>
                    </div>
                </div>
            </div>
            <div className="card-bottom">
                <div className='card-bottom-info'>
                    <p>{students}</p>
                    <p>{students > 1 ? "O'quvchilari" : "O'quvchi"}</p>
                </div>
                <div className='card-bottom-info'>
                    <p>{groups}</p>
                    <p>{groups > 1 ? 'Guruhlari' : 'Guruh'}</p>
                </div>
            </div>
        </div>
    )
}

export default Card