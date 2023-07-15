import React from 'react'
import './Profile.scss'
import Layout from '../../layouts/Layout'
import { useNavigate } from 'react-router-dom'

function Profile() {
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
        <Layout>
            <div className='profile-container'>
                <p className='title'>Student Name</p>
                <div className="context">
                    <div className="profile-box">
                        <div className="header-showcase">
                            <div className="img">
                                <img src="/img/profile.png" alt='' />
                            </div>
                            <div className='btn'>
                                <button>
                                    <img src="/img/edit.png" alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="header-body">
                            <div className="header-title">
                                <p>ALIYEV JASUR</p>
                            </div>
                            <p className='profession'>FrontEnd Developer</p>
                            <ul>
                                <li>HTML 5</li>
                                <li>CSS 5</li>
                                <li>JAVASCRIPT</li>
                            </ul>
                        </div>
                    </div>
                    <div className="box-on-right">
                        <div className="box">
                            <p className="box-title">Teachers</p>
                            <div className="teachers">
                                <div className="box-item" onClick={() => navigate(`/teacher/1`)}>
                                    <img src="/img/profile.png" alt='' />
                                    <p className='box-name'>Aliyev Vali</p>
                                    <p className="box-profession">Frontend developer</p>
                                </div>
                                <div className="box-item" onClick={() => navigate(`/teacher/1`)}>
                                    <img src="/img/profile.png" alt='' />
                                    <p className='box-name'>Aliyev Vali</p>
                                    <p className="box-profession">Frontend developer</p>
                                </div>
                            </div>
                        </div>
                        <div className="box">
                            <p className='box-title'>Lessons day</p>
                            <div className="lessons">
                                <div className="top">
                                    {array.map((item, idx) => (
                                        <p key={idx}>{item}</p>
                                    ))}
                                </div>
                                <div className="bottom">
                                    {array.map((item, idx) => (
                                        <p className={`simple ${item % 2 === 0 ? '' : 'came'}`}></p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="box">
                            <p className='box-title'>Payments</p>
                            <table className='payment'>
                                <thead>
                                    <tr>
                                        {month.map((item) => (
                                            <th key={item}>
                                                <p>{item.txt}</p>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {month.map((item, idx) => (
                                            <td>
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
                                {month.map((item) => (
                                    <div className={'check'}>
                                        <p>{item.priced ? 'Priced' : 'No Priced'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile