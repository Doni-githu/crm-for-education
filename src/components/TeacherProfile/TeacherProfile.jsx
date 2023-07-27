import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layouts/Layout'
import './TeacherProfile.scss'
import { context } from '../../provider/provider'
import { useNavigate, useParams } from 'react-router-dom'
import Mentor from '../../services/mentor'
import User from '../../services/user'
import Payment from '../../services/payment'

import Loader from '../../uiComponents/Loader/Loader'
import Group from '../../services/groups'

function TeacherProfile() {
    const { state: { mentor }, dispatch } = useContext(context)
    const [data2, setData2] = useState([])
    const [pays, setPays] = useState([])
    const [slug, setSlug] = useState('')
    const [groups, setGroups] = useState([])
    const { state } = useContext(context)
    function findAndUpdate(slug) {
        localStorage.setItem('any', slug)
        setSlug(slug)
    }
    const navigate = useNavigate()
    const params = useParams()
    useEffect(() => {
        setSlug(localStorage.getItem('any'))
        Mentor.getOne(parseInt(params.id))
            .then((res) => {
                dispatch({ type: 'getMentor', payload: res.data })
            }).catch((err) => {
                console.log(err)
            })
        User.all()
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
                    for (let j = 0; j < element.teachers.length; j++) {
                        const element2 = element.teachers[j];
                        if (element2.id === parseInt(params.id)) {
                            setData2([...data2, element])
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })

        Group.all()
            .then((res) => {
                const filered = res.data.filter(c => c.teacher.id === parseInt(params.id))
                console.log(res.data)
                setGroups(filered)
            })
        Payment.all()
            .then((res3) => {
                const filtered2 = res3.data.filter((item => item.teacher.id === parseInt(params.id)))
                setPays(filtered2)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const btns = [
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
    ]


    return (
        <Layout>
            {mentor ? <>
                <div className="teacher-container attendance-container">
                    <div className="teacher-title attendance-title">
                        <p className='title'>Teacher {mentor.name}</p>
                        {state.role === "DR" || state.role === "AD" ? <>
                            <div className="btn-contain">
                                <div className="btn">
                                    <button onClick={() => navigate(`/edit/teacher/${mentor.id}`)}>
                                        <div className="img">
                                            <i className='fa-solid fa-edit'></i>
                                        </div>
                                        <span>Edit teacher</span>
                                    </button>
                                </div>
                            </div>
                        </> : null}
                    </div>
                    <div className="context">
                        <div className="profile-box">
                            <div className="header-showcase">
                                <div className="img">
                                    <p>{mentor.name ? mentor.name.slice(0, 1) : ''}</p>
                                </div>
                            </div>
                            <div className="header-body">
                                <div className="header-title">
                                    <p>{mentor.surname} {mentor.name}</p>
                                </div>
                                {mentor.profession ? mentor.profession.map((item) => (
                                    <div key={item.id + 3}>
                                        <p className='profession' key={item.id}>{item.name}</p>
                                        <ul key={item.id + 1}>
                                            {item.technologies ? item.technologies.map((item2) => (
                                                <li key={item2.id}>{item2.name}</li>
                                            )) : null}
                                        </ul>
                                    </div>
                                )) : ''}
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
                                    <div className="any">
                                        {pays.length !== 0 ? <>
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
                                                    {pays.map((item, idx) => (
                                                        <tr key={item.id * 2}>
                                                            <td>
                                                                <div className="check-w">
                                                                    <label>
                                                                        <input type="checkbox" className='hid' />
                                                                        <span className='fake'></span>
                                                                    </label>
                                                                    <p>{item.id}</p>
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
                                                                <p>{item.quantity}</p>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </> : null}
                                        <div className='groups'>
                                            {groups.length !== 0 ? groups.map((item) => (
                                                <div onClick={() => navigate(`/attendance/${item.id}`)} className="group" key={item.id}>
                                                    <img src="/img/folder.png" />
                                                    <p className='groupName'>{item.name}</p>
                                                    <p className='studentsNumbers'>{item.students.length}</p>
                                                </div>
                                            )) : null}
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="students-cards">
                                        {data2.map((item) => (
                                            <div key={item.id} className="student-card" onClick={() => navigate(`/profile/${item.id}`)}>
                                                <div className="names">
                                                    <div className="img">
                                                        <p>{item.name.slice(0, 1)}</p>
                                                    </div>
                                                    <div className="flex">
                                                        <p>{item.name} {item.surname}</p>
                                                        <p>+{item.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="boxs">
                                                    <div className="box">
                                                        <p>Qatnashgan darslari</p>
                                                        <p>{item.davomat.filter(c => c.keldi === 'c').length}</p>
                                                    </div>
                                                    <div className="box">
                                                        <p>Sababli darslari</p>
                                                        <p>{item.davomat.filter(c => c.keldi === 'w').length}</p>
                                                    </div>
                                                    <div className="box">
                                                        <p>Sababsiz kelmagan</p>
                                                        <p>{item.davomat.filter(c => c.keldi === 'g').length}</p>
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
            </> : <Loader />}
        </Layout>
    )
}

export default TeacherProfile