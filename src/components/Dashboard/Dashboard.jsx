import React, { useContext } from 'react'
import './Dashboard.scss'
import Layout from "../../layouts/Layout"
import { context } from '../../provider/provider'
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
    const { state: { groups } } = useContext(context)
    const navigate = useNavigate()
    
    return (
        <Layout>
            <h1 className='dashboard-title'>Groups</h1>
            <div className="rows">
                {groups ? groups.map((item) => (
                    <div onClick={() => navigate(`/attendance/${item.id}`)}  className='row' key={item.id}>
                        
                        <div className='block first'>
                            <p>Group Name</p>
                            <p>{item.gName}</p>
                        </div>
                        <div className='block second'>
                            <p>Started</p>
                            <p>{item.start}</p>
                        </div>
                        <div className='block thred'>
                            <p>Finished</p>
                            <p>{item.finish}</p>
                        </div>
                        <div className='block four'>
                            <p>Mentor</p>
                            <img src={item.src} alt={item.gName} />
                        </div>
                        <div className='block five'>
                            <p>Student length</p>
                            <p>{item.students.length > 1 ? `${item.students.length} students` : `${item.students.length} student`}</p>
                        </div>
                        <div className='block six'>
                            <p>Week / Day</p>
                            <p>{item.workDay}</p>
                        </div>
                        <div className='block feven'>
                            <p>Time</p>
                            <p>{item.time}</p>
                        </div>
                    </div>
                )) : null}
            </div>
        </Layout>
    )
}
