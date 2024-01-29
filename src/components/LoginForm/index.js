import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 60})
    history.replace('/')
    console.log(jwtToken)
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  // renderUsernameField = () => {
  //   const {username} = this.state
  //   return (
  //     <>
  //       <label htmlFor="username" className="input-label">
  //         USERNAME
  //       </label>
  //       <input
  //         type="text"
  //         value={username}
  //         id="username"
  //         className="input-field"
  //         onChange={this.onChangeUsername}
  //       />
  //     </>
  //   )
  // }

  // renderPasswordField = () => {
  //   const {password} = this.state
  //   return (
  //     <>
  //       <label htmlFor="password" className="input-label">
  //         PASSWORD
  //       </label>
  //       <input
  //         type="password"
  //         value={password}
  //         id="password"
  //         className="input-field"
  //         onChange={this.onChangePassword}
  //       />
  //     </>
  //   )
  // }

  // renderMobileView = () => {
  //   return (
  //     <>
  //       <div className="mobile-cont-view">
  //         <img
  //           src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1706019007/Rectangle_1457mb_bihwri.png"
  //           className="mobile-img"
  //         />
  //         <h1 className="login-text-mobile">Login</h1>
  //       </div>
  //     </>
  //   )
  // }

  render() {
    const {showSubmitError, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="form-container">
          <div className="mobile-cont-view">
            <img
              src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1706019007/Rectangle_1457mb_bihwri.png"
              className="mobile-img"
              alt="website login"
            />
            <h1 className="login-text-mobile">Login</h1>
          </div>
          <form className="form" onSubmit={this.submitForm}>
            <div className="bottom-container">
              <img
                src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1704448125/Group_7420cap_rrqgnf.png"
                className="cap-img"
                alt="website logo"
              />
              <h1 className="tasty-heading">Tasty Kitchens</h1>
              <h1 className="login-heading">Login</h1>
            </div>
            <div>
              <label htmlFor="USERNAME" className="input-label">
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                id="USERNAME"
                className="input-field"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="PASSWORD" className="input-label">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                id="PASSWORD"
                className="input-field"
                onChange={this.onChangePassword}
              />
            </div>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1704382176/Rectangle_1456_cjkthi.png"
            className="img"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
