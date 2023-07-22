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
                dispatch({ type: 'attendance', payload: res.data })
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
                student: attendance.student
            }
            await DavomatReq.getOne(attendance.id, result)
            dispatch({ type: 'updateAttendance', payload: [groupId, studentId, attendance.id, rol] })
        } catch (error) {
            console.log(error)
        }
    }
    const toProfile = (id) => {
        Auth.getUseById(id, 'ST')
            .then((res) => {
                dispatch({ type: 'studentProfile', payload: res.data })
                dispatch({ type: 'startLook', paylod: 'ST' })
                localStorage.setItem("lookingST", true)
                navigate(`/profile/${id}`)
            }).catch((err) => {
                console.log(err)
            })
    }
    const users = state.users;
    return (
        <Layout>
            {users ? <>
                <div className='attendance-container'>
                    <p className='title'>{users ? users.name : ''}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div className='form-input-seach'>
                                        <input onChange={(e) => setTerm(e.target.value)} value={term} placeholder='Search...' type="text" />
                                        <button className='button-for-input'>
                                            <img src="/img/search.png" />
                                        </button>
                                    </div>
                                </th>
                                {array.map(item => (
                                    <th key={item + 3}>
                                        <span className='work_day'>{item}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users ? lookingForStudent(users.students, term).map(item => (
                                <tr key={item.id}>
                                    <td id='uuid'>
                                        <div onClick={() => toProfile(item.id)} className="user">
                                            <span>{item.name} {item.surname}</span>
                                        </div>
                                    </td>
                                    {item.davomat.map((item2) => (
                                        <td key={item2.id} style={{ textAlign: 'center' }}>
                                            <button key={item2.id} className={`table-button ${item2.keldi}`}>
                                                {state.role === 'AD' && state.role === 'DR' ? <>
                                                    <ul className='hover-paginate'>
                                                        <li onClick={() => changeVisiblity(users.id, item.id, item2, 'g')}>Qatnashmadi</li>
                                                        <li onClick={() => changeVisiblity(users.id, item.id, item2, 'w')}>Sababli</li>
                                                        <li onClick={() => changeVisiblity(users.id, item.id, item2, 'c')}>Qatnashdi</li>
                                                    </ul>
                                                </> : ''}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            )) : ''}
                        </tbody>
                    </table>
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