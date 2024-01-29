import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosCloseCircle, IoMdClose} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    activeMenu: false,
  }

  onToggleMenu = () => {
    this.setState(prevState => ({activeMenu: !prevState.activeMenu}))
  }

  onCloseMenu = () => {
    this.setState({activeMenu: false})
  }

  onHome = () => {
    const {history} = this.props
    if (history.location.pathname !== '/') {
      localStorage.setItem('curr_page', '1')
    }
  }

  onClickLogout = () => {
    const {history} = this.props
    localStorage.setItem('curr_page', 1)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {activeMenu} = this.state
    const itemsList = JSON.parse(localStorage.getItem('cart_items'))
    const cartItemsCount = itemsList === null ? 0 : itemsList.length
    const {location} = this.props
    const {pathname} = location
    const pathParts = pathname.split('/')
    const path = pathParts[1]
    const homeClassName = path === '' ? 'active' : ''
    const cartClassName = path === 'cart' ? 'active' : ''

    const menu = activeMenu ? (
      <IoMdClose onClick={this.onToggleMenu} className="menu-icon" />
    ) : (
      <GiHamburgerMenu onClick={this.onToggleMenu} className="menu-icon" />
    )

    return (
      <>
        <nav className="nav-container">
          <div className="nav-img-container">
            <img
              src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1704448125/Group_7420cap_rrqgnf.png"
              className="cap-img"
              alt="website logo"
            />
            <p className="tasty-nav-heading">Tasty Kitchens</p>
          </div>
          <ul className="nav-items">
            <Link to="/" className="nav-link" onClick={this.onHome}>
              <li className={`home ${homeClassName}`}>Home</li>
            </Link>
            <Link to="/cart" className="nav-link">
              <li className={`cart ${cartClassName}`}>Cart</li>
            </Link>
            <li>
              <button
                className="logout-btn"
                onClick={this.onClickLogout}
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className="mob-nav">
          <Link to="/" className="mb-dec">
            <div className="mob-logo-box">
              <img
                src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1704448125/Group_7420cap_rrqgnf.png"
                className="mob-app-logo"
                alt="app-logo"
              />
              <h1 className="mob-app-title">Tasty Kitchens</h1>
            </div>
          </Link>
          {menu}
        </div>
        {activeMenu ? (
          <div className="menu-list-box">
            <ul className="nav-list">
              <Link to="/" onClick={this.onHome} className="nav-link">
                <li className={homeClassName} onClick={this.closeMenu}>
                  Home
                </li>
              </Link>
              <Link to="/cart" className="nav-link">
                <li className={cartClassName} style={{marginRight: '0px'}}>
                  Cart
                </li>
              </Link>
              <li>
                <button
                  className="logout-btn"
                  onClick={this.onClickLogout}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
            <IoIosCloseCircle
              className="mob-menu-close-icon"
              onClick={this.onCloseMenu}
            />
          </div>
        ) : null}
      </>
    )
  }
}

export default withRouter(Header)
