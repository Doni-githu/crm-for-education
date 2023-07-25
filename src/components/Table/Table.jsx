import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../provider/provider'
import './Table.scss'
import Mentor from '../../services/mentor'
import User from '../../services/user'
import Payment from '../../services/payment'
import Group from '../../services/groups'
import { useNavigate, useParams } from 'react-router-dom'
export default function Table() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        User.all()
            .then((res) => {
                setData(res.data)
            })
    }, [])
    const toProfile = (e, id) => {
        const className = e.target.className
        if(className === "button" || className === "fa-solid fa-edit" || className === "img"){

        }else{
            navigate(`/profile/${id}`)
        }
    }

    return (
        <div className="salary-table">
            <div className="table-header">
                <div className='col-header'>
                    <p>ID</p>
                </div>
                <div className="col-header">
                    <p>Name</p>
                </div>
                <div className="col-header">
                    <p>Surname</p>
                </div>
                <div className="col-header">
                    <p>Username</p>
                </div>
                <div className="col-header">
                    <p>Telephone</p>
                </div>
            </div>
            <div className="table-body">
                {data.map((item) => (
                    <div key={item.id} onClick={(e) => toProfile(e, item.id)} style={{ cursor: 'pointer' }} className='table-room'>
                        <div className='col-body'>
                            <p>{item.id}</p>
                        </div>
                        <div className='col-body'>
                            <p>{item.name}</p>
                        </div>
                        <div className='col-body'>
                            <p>{item.surname}</p>
                        </div>
                        <div className='col-body'>
                            <p>{item.username}</p>
                        </div>
                        <div className='col-body'>
                            <p>+{item.phone}</p>
                        </div>
                        <div className='absolute'>
                            <div className="btn">
                                <button className='button' onClick={() => navigate(`/edit/student/${item.id}`)}>
                                    <div className="img">
                                        <i className='fa-solid fa-edit'></i>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
