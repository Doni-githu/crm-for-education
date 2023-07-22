import { Link, useNavigate } from 'react-router-dom'
import './Navigation.scss'
import { useLocation, } from 'react-router-dom'
import { useContext } from 'react'
import { context } from '../../provider/provider'

function Navigation() {
    const local = useLocation()
    const navigate = useNavigate()
    const { dispatch, state } = useContext(context)
    const routes = [
        {
            route: 'groups',
            txt: 'Groups',
            icon: <i className="fa-solid fa-user-group"></i>,
            block: localStorage.getItem('role') === 'TR' || localStorage.getItem('role') === 'ST'
        },
        {
            route: 'profile',
            txt: 'Profile',
            icon: <i className="fa-solid fa-user"></i>,
            block: localStorage.getItem('role') === 'DR' || localStorage.getItem('role') === 'AD'
        },
        {
            route: 'payments',
            txt: 'Payments',
            icon: <i className="fa-solid fa-credit-card"></i>,
            block: localStorage.getItem('role') === 'DR' || localStorage.getItem('role') === 'TR' || localStorage.getItem('role') === 'ST'
        },
        {
            route: 'salary',
            txt: "Teacher's",
            icon: <i className="fa-solid fa-money-check-dollar"></i>,
            block: localStorage.getItem('role') === 'ST' ||
                localStorage.getItem('role') === 'TR' ||
                localStorage.getItem('role') === 'DR' ||
                localStorage.getItem('role') === 'AD'
        },
        {
            route: 'teachers',
            txt: "Teachers",
            icon: <i className="fa-solid fa-person-chalkboard"></i>,
            block: localStorage.getItem('role') === 'TR' || localStorage.getItem('role') === 'ST'
        },
    ]
    const signOut = () => {
        dispatch({ type: 'logout' })
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/')
    }
    return (
        <div className='navigation'>
            <div className="navigation-container">
                <div className="brand">
                    <img src="/img/logo.svg" alt="Logo" />
                </div>
                {state.user || state.role === 'DR' || state.role === 'AD' ? <>
                    <ul className='list'>
                        {routes.map((item, idx) => (
                            <li style={{ display: item.block ? 'none' : 'flex' }} key={idx} className={item.route !== local.pathname.slice(1).split('/')[0] ? '' : item.route === 'profile' && state.role !== 'TR' && state.role !== 'AD' && state.role !== 'DR' ? 'active' : ''}>
                                <Link to={item.route !== 'profile' ? `/${item.route}` : state.role === 'TR' ? `/teacher/${state.user.id}` : `/profile/${state.user.id}`}>
                                    <div className='img'>
                                        {item.icon}
                                    </div>
                                    <p>{item.txt}</p>
                                </Link>
                            </li>
                        ))}
                        {state.role === "AD" ? <>
                            <li>
                                <Link to={'/add/student'}>
                                    <div className='img'>
                                        <i className='fa-solid fa-plus'></i>
                                    </div>
                                    <p>Add Student</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/add/pro'}>
                                    <div className='img'>
                                        <i className='fa-solid fa-plus'></i>
                                    </div>
                                    <p>Add Profession</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/add/technology'}>
                                    <div className="img">
                                        <i className="fa-solid fa-plus"></i>
                                    </div>
                                    <p>Add Technology</p>
                                </Link>
                            </li>
                        </> : null}
                    </ul>
                </> : null}
            </div>
            <div className="logOut" onClick={signOut}>
                <img src="/img/logout.png" alt="Log out" />
                <p>Log out</p>
            </div>
        </div >
    )
}
export default Navigation