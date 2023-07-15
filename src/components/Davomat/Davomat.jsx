import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout'
import './Davomat.scss'
import { useContext } from 'react'
import { context } from '../../provider/provider'
import { useNavigate, useParams } from 'react-router-dom'

function Davomat() {
    const [term, setTerm] = useState('')
    const { state: { users }, dispatch } = useContext(context)
    const now = new Date().toJSON()
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const id = Number(params.id)
        dispatch({ type: 'attendance', payload: id })
    }, [])

    let result = changeAttendance(parseInt(now.split('-')[1]))
    let array = []
    for (let i = 1; i < result + 1; i++) {
        array.push(i)
    }
    function changeAttendance(i) {
        return {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 12,
            7: 12,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        }[i]
    }
    const lookingForStudent = (array, term) => {
        if (term.length === 0) {
            return array;
        }
        const filtered = array.filter(item => item.name.toLowerCase().includes(term.toLowerCase()))

        return filtered
    }
    const changeVisiblity = (groupId, studentId, attendanceId, rol) => {
        dispatch({ type: 'updateAttendance', payload: [groupId, studentId, attendanceId, rol] })
    }
    return (
        <Layout>
            <div className='attendance-container'>
                <p className='title'>{users ? users.gName : ''}</p>
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
                                    <div onClick={() => navigate(`/profile/${item.id}`)} className="user">
                                        <img src="https://picsum.photos/200/300" width={'50px'} height={'50px'} alt="" />
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                {item.attendance.map((item2) => (
                                    <td key={item2.id} style={{ textAlign: 'center' }}>
                                        <button key={item2.id} className={`table-button ${item2.rol}`}>
                                            <ul className='hover-paginate'>
                                                <li onClick={() => changeVisiblity(users.id, item.id, item2.id, 'g')}>Qatnashmadi</li>
                                                <li onClick={() => changeVisiblity(users.id, item.id, item2.id, 'w')}>Sababli</li>
                                                <li onClick={() => changeVisiblity(users.id, item.id, item2.id, 'c')}>Qatnashdi</li>
                                            </ul>
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
        </Layout>
    )
}

export default Davomat