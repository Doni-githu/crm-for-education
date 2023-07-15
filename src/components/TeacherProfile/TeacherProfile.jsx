import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layouts/Layout'
import './TeacherProfile.scss'
import { context } from '../../provider/provider'
import { useNavigate } from 'react-router-dom'

function TeacherProfile() {
    const [slug, setSlug] = useState('')
    function findAndUpdate(slug) {
        localStorage.setItem('any', slug)
        setSlug(slug)
    }
    const navigate = useNavigate()
    useEffect(() => {
        setSlug(localStorage.getItem('any'))
    }, [])
    const [btns] = useState([
        {
            txt: 'My data',
            id: 0,
            click: findAndUpdate,
            slug: 'data'
        },
        {
            id: 1,
            txt: 'My Students',
            click: findAndUpdate,
            slug: 'students'
        }
    ])

    const { state: { mentor } } = useContext(context)
    return (
        <Layout>
            <div className="teacher-container">
                <p className='title'>Teacher {mentor.name}</p>
                <div className="context">
                    <div className="profile-box">
                        <div className="header-showcase">
                            <div className="img">
                                <img src="https://picsum.photos/200/200" width={'72px'} height={'72px'} style={{
                                    padding: '4px',
                                    border: '1px solid var(--ext-blue)',
                                    borderRadius: "50%"
                                }} alt=''/>
                            </div>
                            <div className='btn'>
                                <button>
                                    <img src="/img/edit.png" alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="header-body">
                            <div className="header-title">
                                <p>{mentor.surname} {mentor.name}</p>
                            </div>
                            <p className='profession'>FrontEnd Developer</p>
                            <ul>
                                <li>HTML 5</li>
                                <li>CSS 5</li>
                                <li>JAVASCRIPT</li>
                                <li>NodeJS</li>
                                <li>ReactJS</li>
                                <li>VueJS</li>
                                <li>ExpressJS</li>
                                <li>NextJS</li>
                                <li>NestJS</li>
                            </ul>
                        </div>
                    </div>
                    <div className="for-right">
                        <div className="two-buttons">
                            <div className="button-container">
                                {btns.map((item) => (
                                    <div key={item.id} className="btn">
                                        <button className={slug === item.slug ? 'active' : ''} onClick={() => item.click(item.slug)}>{item.txt}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="show">
                            {localStorage.getItem('any') === 'data' ? <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '28%' }}>
                                                <p>ID</p>
                                            </th>
                                            <th>
                                                <p>Name</p>
                                            </th>
                                            <th>
                                                <p>Surname</p>
                                            </th>
                                            <th>
                                                <p>Month</p>
                                            </th>
                                            <th>
                                                <p>Salary</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mentor.pays.map((item, idx) => (
                                            <tr key={item.id * 2}>
                                                <td>
                                                    <div className="check">
                                                        <label>
                                                            <input type="checkbox" className='hid' />
                                                            <span className='fake'></span>
                                                        </label>
                                                        <p>{idx + 1}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>{mentor.name}</p>
                                                </td>
                                                <td>
                                                    <p>{mentor.surname}</p>
                                                </td>
                                                <td>
                                                    <p>{item.month}</p>
                                                </td>
                                                <td>
                                                    <p>{item.salary}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </> : <>
                                <div className="students-cards">
                                    {mentor.students.map((item, idx) => (
                                        <div className="student-card" onClick={() => navigate(`/profile/${item.id}`)}>
                                            <div className="names">
                                                <div className="img">
                                                    <img src="https://picsum.photos/200/300" width={'72px'} height={'72px'} alt={item.name} />
                                                </div>
                                                <div className="flex">
                                                    <p>{item.name} {item.surname}</p>
                                                    <p>{item.phone}</p>
                                                </div>
                                            </div>
                                            <div className="boxs">
                                                <div className="box">
                                                    <p>Qatnashgan darslari</p>
                                                    <p>{item.come}</p>
                                                </div>
                                                <div className="box">
                                                    <p>Qatnashmagan darslari</p>
                                                    <p>{item.notCome}</p>
                                                </div>
                                                <div className="box">
                                                    <p>Sababsiz kelmagan</p>
                                                    <p>{item.withReason}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default TeacherProfile