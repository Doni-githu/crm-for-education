import React, { useContext, useEffect, useState } from 'react'
import './Profile.scss'
import Layout from '../../layouts/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import Auth from '../../services/user'
import { context } from '../../provider/provider'
import Loader from '../../uiComponents/Loader/Loader'

function Profile() {
    const { state, dispatch } = useContext(context)
    const [isLoading, setLoading] = useState(false)
    const params = useParams()
    useEffect(() => {
        setLoading(true)
        if (!state.studentProfile) {
            const id = parseInt(params.id)
            Auth.getUseById(id, 'ST')
                .then((res) => {
                    dispatch({ type: 'studentProfile', payload: res.data })
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        }
    }, [])
    const now = new Date().toJSON()
    let result = changeAttendance(parseInt(now.split('-')[1]))
    let array = []
    const navigate = useNavigate()
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

    const month = [
        {
            priced: true,
            txt: 'December'
        },
        {
            priced: true,
            txt: 'January'
        },
        {
            priced: true,
            txt: 'February'
        },
        {
            priced: false,
            txt: 'March'
        },
        {
            priced: false,
            txt: 'April'
        },
        {
            priced: true,
            txt: 'May'
        }
    ]

    return (
        <>
            {state.studentProfile ? <Layout>
                <div className='profile-container'>
                    <p className='title'>Student {state.studentProfile.name} {state.studentProfile.surname}</p>
                    <div className="context">
                        <div className="profile-box">
                            <div className="header-showcase">
                                <div className="img">
                                    <p>{state.studentProfile.name.slice(0, 1)}</p>
                                </div>
                            </div>
                            <div className="header-body">
                                <div className="header-title">
                                    <p>{state.studentProfile.name} {state.studentProfile.surname}</p>
                                </div>
                                {state.studentProfile.profession ? state.studentProfile.profession.map((item) => (
                                    <p key={item.id} className='profession'>{item.name}</p>
                                )) : ''}
                                <ul>
                                    {state.studentProfile.technologies ? state.studentProfile.technologies.map((item) => (
                                        <li key={item.id}>{item.name}</li>
                                    )) : ''}
                                </ul>
                            </div>
                        </div>
                        <div className="box-on-right">
                            <div className="box">
                                <p className="box-title">Teachers</p>
                                <div className="teachers">
                                    {state.studentProfile.teachers ? state.studentProfile.teachers.map((item) => (
                                        <div className="box-item" key={item.id} onClick={() => state.role === 'ST' || state.role === "TR" ? null : navigate(`/teacher/${item.id}`)}>
                                            <div className='img'>
                                                <p>{item.name.slice(0, 1)}</p>
                                            </div>
                                            <p className='box-name'>{item.name} {item.surname}</p>
                                            <p className="box-profession">{item.profession[0].name}</p>
                                        </div>
                                    )) : ''}
                                </div>
                            </div>
                            <div className="box">
                                <p className='box-title'>Lessons day</p>
                                <div className="lessons">
                                    <div className="top">
                                        {state.studentProfile.davomat.map((_, idx) => (
                                            <p key={idx}>{idx + 1}</p>
                                        ))}
                                    </div>
                                    <div className="bottom">
                                        {state.studentProfile.davomat.map((item, idx) => (
                                            <p key={idx} className={`simple ${item.keldi}`}></p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <p className='box-title'>Payments</p>
                                <table className='payment'>
                                    <thead>
                                        <tr>
                                            {month.map((item, idx) => (
                                                <th key={idx}>
                                                    <p>{item.txt}</p>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {month.map((item, idx) => (
                                                <td key={idx}>
                                                    <p>{item.priced ? 'Priced' : 'No Priced'}</p>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="box">
                                <p className="box-title">Checks</p>
                                <div className="checks">
                                    {month.map((item, idx) => (
                                        <div key={idx} className={'check'}>
                                            <p>{item.priced ? 'Priced' : 'No Priced'}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout> : <div className='loader'>
                <Loader />
            </div>}
        </>
    )
}

export default Profile