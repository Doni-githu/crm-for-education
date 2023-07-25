import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../provider/provider'
import './Table.scss'
import Mentor from '../../services/mentor'
import User from '../../services/user'
import Payment from '../../services/payment'
import Group from '../../services/groups'
import { useNavigate, useParams } from 'react-router-dom'
import Auth from '../../services/user'
export default function Table() {
    const [data, setData] = useState([])
    const [id, setId] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        User.all()
            .then((res) => {
                setData(res.data)
            })
    }, [])
    const toProfile = (e, id) => {
        const className = e.target.className
        if (className === "button" || className === "fa-solid fa-edit" || className === "fa-solid fa-trash" || className === "img") {

        } else {
            navigate(`/profile/${id}`)
        }
    }

    const removeItem = async (id) => {
        try {
            await Auth.removeStudent(id)
            const filtered = data.filter(c => c.id !== id)
            setData(filtered)
            setId('')
        } catch (error) {

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
                            <div className="btn">
                                <button className='button' onClick={() => setId(item.id)}>
                                    <div className="img">
                                        <i className='fa-solid fa-trash'></i>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {id ? <>
                <div className="modal-danger">
                    <div className="modal-header">
                        <h5>Are you sure?!</h5>
                    </div>
                    <div className="modal-body">
                        <div className="btn-danger">
                            <button onClick={() => removeItem(id)}>Delete</button>
                        </div>
                        <div className="btn-success">
                            <button onClick={() => setId()}>No, thanks</button>
                        </div>
                    </div>
                </div>
            </> : null}
        </div>
    )
}
