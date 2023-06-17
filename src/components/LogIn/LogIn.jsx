import { useState } from 'react'
import Input from '../../uiComponents/Input/Input'
import './LogIn.scss'
export default function LogIn() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
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
                    <Input placeholder={'your name'} state={username} setState={setUserName} label={'username'} id={0} />
                    <Input type={'password'} placeholder={'Password'} state={password} setState={setPassword} label={'Password'} id={1} />
                    <div className="btn">
                        <button className='btn'>
                            <p>Login</p>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
