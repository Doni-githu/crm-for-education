import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout'
import './Davomat.scss'
import { useContext } from 'react'
import { context } from '../../provider/provider'
import { useNavigate, useParams } from 'react-router-dom'
import Group from '../../services/groups'
import Loader from '../../uiComponents/Loader/Loader'
import Auth from '../../services/user'
import DavomatReq from '../../services/davomat'

function Davomat() {
    const [term, setTerm] = useState('')
    const { state, dispatch } = useContext(context)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (state.role === 'ST') {
            navigate(`/profile/${state.user.id}`)
        }
        const id = Number(params.id)
        Group.getOne(id)
            .then((res) => {
                if (res.data.students.length !== 0) {
                    let data2 = []
                    for (let i = 0; i < res.data.students.length; i++) {
                        const element = res.data.students[i];
                        for (let j = 0; j < element.davomat.length; j++) {
                            const element2 = element.davomat[j];
                            if (element2.group === id) {
                                data2.push(element2)
                            }
                        }
                    }
                    const data = { ...res.data, davomat: data2 }
                    dispatch({ type: 'attendance', payload: data })
                } else {
                    navigate(-1)
                }
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    let array = new Array(12).fill(0).map((item, idx) => (item + (idx + 1)))

    const lookingForStudent = (array, term) => {
        if (term.length === 0) {
            return array;
        }
        const filtered = array.filter(item => item.name.toLowerCase().includes(term.toLowerCase()))

        return filtered
    }
    const changeVisiblity = async (groupId, studentId, attendance, rol) => {
        try {
            const result = {
                keldi: rol,
                sana: attendance.sana,
                student: attendance.student,
                group: attendance.group
            }
            await DavomatReq.getOne(attendance.id, result)
            dispatch({ type: 'updateAttendance', payload: [groupId, studentId, attendance.id, rol] })
        } catch (error) {
            console.log(error)
        }
    }
    const toEdit = (e) => {
        navigate(`/edit/group/${e}`)
    }
    const toProfile = (id) => {
        Auth.getOne(id)
            .then((res) => {
                dispatch({ type: 'studentProfile', payload: res.data })
                dispatch({ type: 'startLook', paylod: 'ST' })
                navigate(`/profile/${id}`)
            }).catch((err) => {
                console.log(err)
            })
    }
    const users = state.users;
    let date = new Date(users.begin_date);
    const addSomeThing = async (id) => {
        for (let i = 0; i < users.students.length; i++) {
            const element = users.students[i];
            date.setDate(date.getDate() + i)
            if (element.id === id) {
                const data = {
                    sana: date,
                    keldi: 'e',
                    student: element.id,
                    group: users.id
                }
                let res = await DavomatReq.create(data)
                dispatch({ type: 'upDataSomeThing', payload: [res.data, id] });
            }
            date = new Date(users.begin_date)
        }
    }

    let max = 0
    if (users.students) {
        max = users.students[0].davomat.length || 0
        for (let i = 0; i < users.students.length; i++) {
            const element = users.students[i];
            for (let i = 0; i < element.davomat.length; i++) {
                const element2 = element.davomat[i];
                if (element2.group !== users.id) {
                    max = 0
                }
                else if (element.davomat.length > max) {
                    max = element.davomat.length;
                }
            }
        }
    }
    let count = 0
    let index = 1
    const list = new Array(max).fill(0).map(() => {
        count++
        if (count === 13) {
            count = 1
        }

        return count
    })

    const classNameFunc = (i) => {
        if (i === 0) return ''
        if (i % 12 === 0) {
            return `red`
        }

        return ''
    }

    return (
        <Layout>
            {users ? <>
                <div className='attendance-container'>
                    <div className="attendance-title">
                        <p className='title'>{users ? users.name : ''}</p>
                        {state.role === "AD" ? <>
                            <div className="btn">
                                <button onClick={() => toEdit(users.id)}>
                                    <div className="img">
                                        <i className='fa-solid fa-edit'></i>
                                    </div>
                                    <span>Edit</span>
                                </button>
                            </div>
                        </> : null}
                    </div>

                    <div className="table-container">
                        <table>
                            {/* <div className='arrows'>
                                <div className="btn btn-prev">
                                    <button>
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </button>
                                </div>
                                <div className="btn btn-next">
                                    <button>
                                        <i className='fa-solid fa-arrow-right'></i>
                                    </button>
                                </div>
                            </div> */}
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>
                                        <div className='form-input-seach'>
                                            <input onChange={(e) => setTerm(e.target.value)} value={term} placeholder='Search...' type="text" />
                                            <button className='button-for-input'>
                                                <img src="/img/search.png" />
                                            </button>
                                        </div>
                                    </th>
                                    {list.map((item, idx) => (
                                        <th key={idx}>
                                            <span className='work_day'>{item}</span>
                                        </th>
                                    ))}
                                    <th>
                                        <span>+</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users ? lookingForStudent(users?.students, term)?.map(item => (
                                    <tr key={item.id}>
                                        <td id='uuid'>
                                            <div onClick={() => toProfile(item.id)} className="user">
                                                <span>{item.name} {item.surname}</span>
                                            </div>
                                        </td>
                                        {item.davomat ? item.davomat.map((item2, index2) => (
                                            item2.group === users.id ? <>
                                                <td key={item2.id} className={classNameFunc(index2)} style={{ textAlign: 'center' }}>
                                                    <button key={item2.id} className={`table-button ${item2.keldi}`}>
                                                        {state.role === "TR" ? <>
                                                            <ul className='hover-paginate'>
                                                                <li onClick={() => changeVisiblity(users.id, item.id, item2, 'g')}>Qatnashmadi</li>
                                                                <li onClick={() => changeVisiblity(users.id, item.id, item2, 'w')}>Sababli</li>
                                                                <li onClick={() => changeVisiblity(users.id, item.id, item2, 'c')}>Qatnashdi</li>
                                                            </ul>
                                                        </> : null}
                                                    </button>
                                                </td>
                                            </> : null
                                        )) : null}
                                        <td id='uuid2' style={{ textAlign: 'center' }}>
                                            <button className='table-button c' style={{ color: '#fff' }} onClick={() => addSomeThing(item.id)}>
                                                <i className='fa-solid fa-plus'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )) : ''}
                            </tbody>
                        </table>
                    </div>
                    <div className='container-information'>
                        <div className="contain">
                            <div className='box-information'>
                                <span className='simple red'></span>
                                <p>Qatnashmadi</p>
                            </div>
                            <div className='box-information'>
                                <span className='simple violet'></span>
                                <p>Sababli</p>
                            </div>
                            <div className='box-information'>
                                <span className='simple blue'></span>
                                <p>Qatnashdi</p>
                            </div>
                        </div>
                    </div>
                </div>

            </> : <Loader />}
        </Layout>
    )
}

export default Davomat