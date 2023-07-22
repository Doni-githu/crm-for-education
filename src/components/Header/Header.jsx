import React, { useContext, useState } from 'react'
import './Header.scss'
import { context } from '../../provider/provider'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const [term, setTerm] = useState('')
    const { state } = useContext(context)
    const navigate = useNavigate()
    const toProfile = () => {
        if (state.role === 'ST' || state.role === 'STUDENT') {
            navigate(`/profile/${state.user.id}`);
        }

        if (state.role === 'TR' || state.role.toLowerCase() === 'teacher') {
            navigate(`/teacher/${state.user.id}`)
        }
    }
    return (
        <div className='header'>
            <div className="left">
            </div>
            <div className="profile" onClick={toProfile}>
                {state.user ? <>
                    <p>{state.user.name} {state.user.surname}</p>
                </> : ''}
                <div className='down'>
                    <i className="fa-solid fa-sort-down"></i>
                </div>
            </div>
        </div>
    )
}
