import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.scss'
import Layout from "../../layouts/Layout"
import { context } from '../../provider/provider'
import { useNavigate } from 'react-router-dom'
import Group from '../../services/groups'
import moment from "moment"
import Loader from '../../uiComponents/Loader/Loader'
export default function Dashboard() {
    const navigate = useNavigate()
    const [groups, setGroups] = useState([])
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
                    <div onClick={() => navigate(`/attendance/${item.id}`)} className='row' key={item.id}>
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
                            <p>{item.teacher.name} {item.teacher.surname}</p>
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
                    </div>
                )) : <Loader />}
            </div>
        </Layout>
    )
}
