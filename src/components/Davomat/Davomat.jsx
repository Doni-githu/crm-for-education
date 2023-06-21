import React from 'react'
import Layout from '../../layouts/Layout'
import './Davomat.scss'
import { useContext } from 'react'
import { context } from '../../provider/provider'

function Davomat() {
    const { state: { users } } = useContext(context)
    const now = new Date().toJSON()
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
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        }[i]
    }
    return (
        <Layout>
            <div className='attendance-container'>
                <p className='title'>Attendance</p>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className='form-input-seach'>
                                    <input placeholder='Search...' type="text" />
                                    <button className='button-for-input'>
                                        <img src="/img/search.png" alt="" />
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
                        {users.map(item => (
                            <tr key={item.id}>
                                <td id='uuid'>
                                    <div className="user">
                                        <img src="https://picsum.photos/200/300" width={'50px'} height={'50px'} alt="" />
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                {array.map((item) => (
                                    <td key={item} style={{ textAlign: 'center' }}>
                                        <button key={item + 1} className={`table-button ${item % 2 === 0 ? 'notCome' : 'by'}`}></button>
                                    </td>
                                ))}
                            </tr>
                        ))}
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
                            <p>Qatnashmadi</p>
                        </div>
                        <div className='box-information'>
                            <span className='simple blue'></span>
                            <p>Qatnashmadi</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Davomat