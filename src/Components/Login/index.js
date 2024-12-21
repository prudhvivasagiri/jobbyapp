import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMsg: error})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const credentials = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-login"
          />
          <form onSubmit={this.onSubmitLogin} className="form-container">
            <label htmlFor="username">USERNAME</label>
            <input
              placeholder="Username"
              id="username"
              onChange={this.onChangeUsername}
              value={username}
              type="text"
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              placeholder="Password"
              id="password"
              onChange={this.onChangePassword}
              value={password}
              type="password"
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="error-msg">{errorMsg}</p>
        </div>
      </div>
    )
  }
}

export default Login
