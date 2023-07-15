import React from 'react'
import './Card.scss'
import { useNavigate } from 'react-router-dom'
function Card({ item }) {
    const navigate = useNavigate()
    
    const toProfile = id => {
        navigate(`/teacher/${id}`)
    }
    return (
        <div className='card'>
            <div className="card-top">
                <div className='card-bottom-profile'>
                    <img src={item.src} alt="Profile" />
                    <strong className='mentor-name'>{item.name}</strong>
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
                    <p>{item.students}</p>
                    <p>{item.students > 1 ? "O'quvchilari" : "O'quvchi"}</p>
                </div>
                <div className='card-bottom-info'>
                    <p>{item.groups}</p>
                    <p>{item.groups > 1 ? 'Guruhlari' : 'Guruh'}</p>
                </div>
            </div>
        </div>
    )
}

export default Card