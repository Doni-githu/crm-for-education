import React, { useEffect, useState } from 'react'
import '../addStudent/addStudent.scss'
import './AddTechnology.scss'
import '../addProfession/addProfession.scss'
import Technology from '../../services/technology'
import Profession from '../../services/profession'
import Mentor from '../../services/mentor'
import Auth from '../../services/user'
export default function AddProfession() {
    const [name, setName] = useState('')
    const [profession2, setProfessions2] = useState([])
    const [professions, setProfessions] = useState([])
    const [professionId, setProfessionId] = useState()
    const addToProfessions = async () => {
        if (!name) {
            return;
        }
        if (professions.includes(name)) {
            return;
        }



        const newPro = {
            name,
            profession: professionId
        }
        await Technology.create(newPro)
        setProfessions([...professions, newPro])
        setName('')
    }

    useEffect(() => {
        Technology.all()
            .then((res) => {
                if (res.data.length === 0) {
                    return
                }
                setProfessions(res.data)
            })
        Profession.all()
            .then(res => {
                if (res.data.length !== 0) {
                    setProfessionId(res.data[0].id)
                    setProfessions2(res.data)
                }
            })
    }, [])

    const changePro = (value) => {
        setProfessionId(parseInt(value))
    }

    const removeInProfession = (id) => {
        if (!id) {
            return
        }
        Technology.delete(id)
            .then(() => {
                const newPro = professions.filter(c => c.id !== parseInt(id))
                setProfessions(newPro)
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className='add-container'>
            <div className="title">
                <p>Add Technology</p>
            </div>
            <form onSubmit={e => e.preventDefault()}>
                <div className="list">
                    <ul className='list-nest'>
                        {professions.map((item, idx) => (
                            <li key={idx}>
                                <span>{item.name}</span>
                                <div onClick={(event) => removeInProfession(item.id, event)} className="trash">
                                    <button>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="form-grid-2 grid">
                    <div className="form-floating">
                        <input id='pro' type={'text'} placeholder={'Texnologiya kiriting'} onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className="select-container">
                        {profession2.length !== 0 ?
                            <select id='professions' onChange={(e) => changePro(e.target.value)}>
                                {profession2.map(item => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                            : null}
                    </div>
                    <div className='btn'>
                        <button onClick={addToProfessions}>
                            <div className="img">
                                <i className='fa-solid fa-plus'></i>
                            </div>
                            <span>Texnology</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
