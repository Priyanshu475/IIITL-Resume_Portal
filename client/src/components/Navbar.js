import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header class="header">
      <div className="IIITL">
        <div className="iiitl-logo">
        </div>
        <div className='IIIT-DES'>
          <p>Indian Institute of Information Technology, Lucknow</p>
          <p>भारतीय सूचना प्रौद्योगिकी संस्थान, लखनऊ</p>
          <p className='Nameweb'>Resume-Portal</p>
          <p></p>
        </div>
      </div>
    {user && (
    <div>
  <input class="menu-btn" type="checkbox" id="menu-btn" />
  <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
  <ul class="menu">
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/user'>Back to Dashboard</Link></li>
    <li><Link to='/user/Notification'>Notifications</Link></li>
    <li><Link to='/user'><button className='Logout' onClick={handleClick}>Logout</button></Link></li>
  </ul>
  </div>
    )}

    {!user && (
        <div>
        <input class="menu-btn" type="checkbox" id="menu-btn" />
        <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
        <ul class="menu">
          <li><Link to='/'>Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to='/signup'>Register</Link></li>
        </ul>
        </div>
    )}
    </header>
  )
}

export default Navbar