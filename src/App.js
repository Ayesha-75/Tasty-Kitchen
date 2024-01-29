import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Cart from './components/Cart'
import CartItemsContext from './Context/CartItemsContext'
import RestaurantDetailedPage from './components/RestaurantDetailedPage'
import './App.css'

class App extends Component {
  state = {
    cartItems: [],
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cart_items'))
    this.setState({cartItems})
  }

  setCartItems = newItem => {
    const list = []
    const cartItems = JSON.parse(localStorage.getItem('cart_items'))
    if (cartItems !== null) {
      for (const i of cartItems) {
        if (i.id === newItem.id) {
          i.quantity = newItem.quantity
          localStorage.setItem('cart_items', JSON.stringify(cartItems))
        } else {
          const updatedList = [...cartItems, newItem]
          localStorage.setItem('cart_items', JSON.stringify(updatedList))
        }
      }
    } else if (cartItems === null) {
      list.push(newItem)
      localStorage.setItem('cart_items', JSON.stringify(list))
    }
  }

  updateQunatity = item => {
    const cartItems = JSON.parse(localStorage.getItem('cart_items'))
    for (const i of cartItems) {
      if (i.id === item.id) {
        i.quantity = item.quantity
      }
    }
    localStorage.setItem('cart_items', JSON.stringify(cartItems))
  }

  render() {
    const {cartItems} = this.state
    return (
      <CartItemsContext.Provider
        value={{
          cartItems,
          setCartItems: this.setCartItems,
          updateQuantity: this.updateQunatity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurants-list/:id"
            component={RestaurantDetailedPage}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartItemsContext.Provider>
    )
  }
}

export default App
