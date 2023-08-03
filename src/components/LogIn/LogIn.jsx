import { useEffect, useState } from 'react'
import Input from '../../uiComponents/Input/Input'
import './LogIn.scss'
import Modal from '../../uiComponents/Modal/Modal'
import Auth from "../../services/user";
import { useContext } from 'react'
import { context } from '../../provider/provider'
import { useNavigate } from "react-router-dom"
export default function LogIn() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState("AD")
    const [error, setError] = useState('')
    const { dispatch, state } = useContext(context)
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') === 'DR' || localStorage.getItem('role') === 'DIRECTOR' || localStorage.getItem('role') === 'AD') {
            navigate('/groups')
        }
        if (localStorage.getItem('role') === 'TR' || localStorage.getItem('role') === 'TEACHER') {
            navigate(`/teacher/${state.user.id}`)
        }
    }, [])
    const onSubmitForm = () => {
        if (!username || !password) {
            setError('All fields are required!')
            return;
        }
        const user = {
            username,
            password,
            role,
        }
        dispatch({ type: 'startlogin' })
        Auth.login(user)
            .then(res => {
                if (res) {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem('role', res.data.role)
                    const payload = {
                        user: res.data.user,
                        role: res.data.role
                    }
                    if (payload.role === 'DR' || payload.role === 'DIRECTOR' || payload.role === 'AD') {
                        navigate('/groups')
                        dispatch({ type: 'user/login', payload })
                    }

                    if (payload.role === 'TR' || payload.role === 'TEACHER') {
                        navigate(`/teacher/${res.data.user.id}`)
                        dispatch({ type: 'user/login', payload })
                    }
                }
                setError('')
            }).catch((err) => {
                setError(err.response.data.message)
            })
    }



    return (
        <div className="container">
            <div className="left">
                <div className='img'>
                    <img src="/img/white.png" alt='Logo' />
                </div>
                <div className='brand'>
                    <p>Texno Park</p>
                </div>
                <div className='body'>
                    <p>Biz bilan birga kelajakni yarating !</p>
                </div>
            </div>
            <div className="right">
                <p className='title'>Login</p>
                <form onSubmit={e => e.preventDefault()}>
                    {error ? <>
                        <Modal type='error' setClose={setError} text={error} />
                    </> : ''}
                    <Input placeholder={'your name'} state={username} setState={setUserName} label={'username'} id={0} />
                    <Input type={'password'} placeholder={'Password'} state={password} setState={setPassword} label={'Password'} id={1} />
                    <div className="btn">
                        <div className="select-container">
                            <select onChange={(e) => setRole(e.target.value)}>
                                <option value="AD">Administrator</option>
                                <option value="TR">O'qituvchi</option>
                                <option value="DR">Direktor O'rinbosari</option>
                                <option value="DR">Director</option>
                            </select>
                        </div>
                        <button onClick={onSubmitForm} className='btn'>
                            <p>Login</p>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
