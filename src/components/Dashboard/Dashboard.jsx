import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.scss'
import Layout from "../../layouts/Layout"
import { context } from '../../provider/provider'
import { useNavigate } from 'react-router-dom'
import Group from '../../services/groups'
import Loader from '../../uiComponents/Loader/Loader'
export default function Dashboard() {
    const navigate = useNavigate()
    const [groups, setGroups] = useState([])
    const [id, setId] = useState()
    const { state } = useContext(context)
    useEffect(() => {
        if (state.role === 'ST') {
            navigate(`/profile/${state.user.id}`)
        }
        Group.all()
            .then((res) => {
                setGroups(res.data)
            })
    }, [])

    const formatChange = date => {
        return date.split(':').splice(0, 2).join(":")
    }

    const removeItem = async (id) => {
        try {
            await Group.remove(id)
            const newGroups = groups.filter(c => c.id !== id)
            setGroups(newGroups)
            setId('')
        } catch (error) {
            console.log(error)
        }
    }

    const toProfile = (id, e) => {
        if (e.target.className.split(" ").reverse()[0] === "danger" || e.target.className === "btn-danger" || e.target.className === "button" || e.target.className === "fa-solid fa-trash") {

        } else {
            navigate(`/attendance/${id}`)
        }
    }
    return (
        <Layout>
            <div className='dashboard-top'>
                <h1 className='dashboard-title'>Groups</h1>
                {state.role === "AD" ? <>
                    <div className="btn">
                        <button onClick={() => navigate('/add/group')}>
                            <div className="img">
                                <i className='fa-solid fa-plus'></i>
                            </div>
                            <p>Add Group</p>
                        </button>
                    </div>
                </> : null}
            </div>
            <div className="rows">
                {groups ? groups.map((item) => (
                    <div onClick={(e) => toProfile(item.id, e)} className='row' key={item.id}>
                        <div className='block first'>
                            <p>Group Name</p>
                            <p>{item.name}</p>
                        </div>
                        <div className='block second'>
                            <p>Started</p>
                            <p>{item.begin_date}</p>
                        </div>
                        <div className='block thred'>
                            <p>Finished</p>
                            <p>{item.complete_date}</p>
                        </div>
                        <div className='block four'>
                            <p>Mentor</p>
                            <div className='img'>
                                <p>{item.teacher.name.slice(0, 1).toUpperCase()}</p>
                            </div>
                        </div>
                        <div className='block five'>
                            <p>Student length</p>
                            <p>{item.students.length > 1 ? `${item.students.length} students` : `${item.students.length} student`}</p>
                        </div>
                        <div className='block six'>
                            <p>Week / Day</p>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                {item.week_days.map((item) => {
                                    return <p key={item.id}>{item.name}</p>
                                })}
                            </div>
                        </div>
                        <div className='block feven'>
                            <p>Time</p>
                            <p>{formatChange(item.when_start)}</p>
                        </div>
                        {state.role === "AD" || state.role === "DR" ? <>
                            <div className='block feven danger'>
                                <div className="btn-danger">
                                    <button className='button' onClick={() => setId(item.id)}>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                </div>
                            </div>
                        </> : null}
                    </div>

                )) : <Loader />}
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
        </Layout>
    )
}
