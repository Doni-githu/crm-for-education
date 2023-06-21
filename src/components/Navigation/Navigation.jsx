import { Link } from 'react-router-dom'
import './Navigation.scss'
import { useLocation, } from 'react-router-dom'

function Navigation() {
    const local = useLocation()
    const routes = [
        {
            route: 'groups',
            txt: 'Groups',
            icon: <i className="fa-solid fa-user-group"></i>
        },
        {
            route: 'profile',
            txt: 'Profile',
            icon: <i className="fa-solid fa-user"></i>
        },
        {
            route: 'attendance',
            txt: 'Attendance',
            icon: <i className="fa-solid fa-clipboard-user"></i>
        },
        {
            route: 'payments',
            txt: 'Payments',
            icon: <i className="fa-solid fa-credit-card"></i>
        },
        {
            route: 'salary',
            txt: 'Salary',
            icon: <i className="fa-solid fa-money-check-dollar"></i>
        },
        {
            route: 'teachers',
            txt: "Teacher's",
            icon: <i className="fa-solid fa-person-chalkboard"></i>
        }
    ]

    return (
        <div className='navigation'>
            <div className="navigation-container">
                <div className="brand">
                    <img src="/img/logo.svg" alt="Logo" />
                </div>
                <ul className='list'>
                    {routes.map((item, idx) => (
                        <li key={idx} className={item.route === local.pathname.slice(1).split('/')[0] ? 'active' : ''}>
                            <Link to={`/${item.route !== 'profile' && item.route !== 'attendance' ? item.route : `${item.route}/123`}`}>
                                <div className='img'>
                                    {item.icon}
                                </div>
                                <p>{item.txt}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="logOut">
                <img src="/img/logout.png" alt="Log out" />
                <p>Log out</p>
            </div>
        </div>
    )
}
export default Navigation