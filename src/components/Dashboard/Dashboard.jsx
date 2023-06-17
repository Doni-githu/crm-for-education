import React from 'react'
import './Dashboard.scss'
import Layout from "../../layouts/Layout"
export default function Dashboard() {
    const data = [
        {
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: 10,
            workDay: 'Du Se Cho',
            time: '14.00'
        }
    ]
    return (
        <Layout>
            <h1 className='dashboard-title'>Groups</h1>
            <div className="rows">
                {[...data, ...data, ...data, ...data, ...data].map(item => (
                    <div className='row'>
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
                            <img src={item.src} />
                        </div>
                        <div className='block five'>
                            <p>Student length</p>
                            <p>{item.students > 1 ? `${item.students} students` : `${item.students} student`}</p>
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
                ))}
            </div>
        </Layout>
    )
}
