import React, { useEffect, useState } from 'react'
import '../addStudent/addStudent.scss'
import '../addProfession/addProfession.scss'
import Profession from '../../services/technology'
export default function AddProfession() {
    const [name, setName] = useState('')
    const [professions, setProfessions] = useState([])

    const addToProfessions = async (event) => {
        if (!name) {
            return;
        }
        if (professions.includes(name)) {
            return;
        }
        if (event.key === "Enter" && event.ctrlKey) {
            const newPro = {
                name,
            }
            await Profession.create(newPro)
            setProfessions([...professions, newPro])
            setName('')
        }
    }

    useEffect(() => {
        Profession.all()
            .then((res) => {
                if (res.data.length === 0) {
                    return
                }
                setProfessions(res.data)
            })
    }, [])

    const removeInProfession = (id) => {
        if (!id) {
            return
        }
        Profession.delete(id)
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
                <div className="form-grid-2">
                    <div className="form-floating">
                        <input id='pro' type={'text'} placeholder={'Texnologiya kiriting'} onKeyUpCapture={addToProfessions} onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                </div>
            </form>
        </div>
    )
}
