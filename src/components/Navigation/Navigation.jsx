import { Link } from 'react-router-dom'
import './Navigation.scss'

function Navigation() {
    const routes = [
        {
            route: '/dashboard',
            txt: 'Dashboard',
            icon: <i class="fa-solid fa-laptop-code"></i>
        },
        {
            route: '/groups',
            txt: 'Groups',
            icon: <i class="fa-solid fa-laptop-code"></i>
        },
        {
            route: '/profile',
            txt: 'Profile',
            icon: <i class="fa-solid fa-laptop-code"></i>
        },
        {
            route: '/profile',
            txt: 'Profile',
            icon: <i class="fa-solid fa-laptop-code"></i>
        },
    ]
    return (
        <div className='navigation'>
            <div className="navigation-container">
                <div className="brand">
                    <img src="/img/logo.svg" alt="Logo" />
                </div>
                <ul className='list'>
                    <li>
                        <Link to={'/dashboard'}>
                            <div className='img'>
                                <i class="fa-solid fa-laptop-code"></i>
                            </div>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <div className="img">
                            <img src="/img/dashboard.png" alt="awada" />
                        </div>
                        <p>Groups</p>
                    </li>
                    <li>
                        <div className='img'>
                            <img src="/img/users.png" alt="Laptop" />
                        </div>
                        <p>Profile</p>
                    </li>
                    <li>
                        <div className='img'>
                            <img src="/img/attre.png" alt="Laptop" />
                        </div>
                        <p>Attendance</p>
                    </li>
                    <li>
                        <div className='img'>
                            <img src="/img/pay.png" alt="Laptop" />
                        </div>
                        <p>Payment</p>
                    </li>
                    <li>
                        <div className='img'>
                            <img src="/img/laptop.png" alt="Laptop" />
                        </div>
                        <p>Salary</p>
                    </li>
                    <li>
                        <img src="/img/teach.png" alt="Laptop" />
                        <p>Teacher's</p>
                    </li>
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