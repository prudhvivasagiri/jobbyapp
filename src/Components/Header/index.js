import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
    console.log(props)
  }
  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="link-list">
        <Link to="/" className="link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li>Jobs</li>
        </Link>
      </ul>
      <ul>
        <li>
          <button onClick={onLogout} type="button" className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
