import { useState } from 'react'
import Input from '../../uiComponents/Input/Input'
import './LogIn.scss'
import Modal from '../../uiComponents/Modal/Modal'
// import Auth from "../../services/user";
// import { useContext } from 'react'
// import { context } from '../../provider/provider'
export default function LogIn() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    // const { state, dispatch } = useContext(context)

    const onSubmitForm = () => {
        if (!username || !password) {
            setError('All fields are required!')
            return;
        }

        // const user = {
        //     username,
        //     password,
        // }
        // Auth.login(user)
        //     .then((res) => {
        //         localStorage.setItem('token', res.data.token)
        //         dispatch({ type: 'user/login', payload: res.data.user })
        //         console.log(res.data)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
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
                            <select>
                                <option value="student">Student</option>
                                <option value="student">Administrator</option>
                                <option value="student">O'qituvchi</option>
                                <option value="student">Direktor O'rinbosari</option>
                                <option value="student">Director</option>
                            </select>
                            <div className="icon-container">
                                <i className='fa-solid fa-caret-down'></i>
                            </div>
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
