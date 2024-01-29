import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

import './index.css'

class Cart extends Component {
  state = {
    itemsList: [],
    placeOrder: false,
  }

  componentDidMount() {
    const itemsList = JSON.parse(localStorage.getItem('cart_items'))
    this.setState({itemsList})
  }

  componentWillUnmount() {
    const itemsList = JSON.parse(localStorage.getItem('cart_items'))

    // console.log(typeof(Object.entries(itemsList)), "000000")

    if (itemsList === null || itemsList.length === 0) {
      localStorage.removeItem('cart_items')
    }
  }

  onPlaceOrder = () => {
    this.setState({placeOrder: true})
    localStorage.removeItem('cart_items')
  }

  renderEmptyCartView = () => (
    <div className="empty-cart-box">
      <img
        src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1705918952/cooking_1bowl_lxca4a.png"
        alt="no cart view"
        className="bowl-image"
      />
      <h2 className="no-orders-text">No Orders Yet!</h2>
      <p className="cart-empty-text">
        Your cart is empty. Add somthing from the menu.
      </p>
      <Link to="/">
        <button className="order-btn" type="button">Order Now</button>
      </Link>
    </div>
  )

  renderPaymentSuccessView = () => (
    <div className="payment-container">
      <img
        src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1705919090/check-circle.1_1s_pewitu.png"
        alt="payment success"
        className="pay-success-img"
      />
      <h1 className="pay-success-text">Payment Successful</h1>
      <p className="thanks-text">
        Thank you for ordering
        <br />
        Your payment is successfully completed.
      </p>
      <Link to="/">
        <button className="go-to-home-btn" type="button">Go To Home</button>
      </Link>
    </div>
  )

  DeleteCartItem = id => {
    const itemsList = JSON.parse(localStorage.getItem('cart_items'))
    if (itemsList === null) {
      localStorage.removeItem('cart_tems')
    } else {
      const updatedList = itemsList.filter(each => each.id !== id)
      this.setState({itemsList: updatedList})
      localStorage.setItem('cart_items', JSON.stringify(updatedList))
    }
  }

  renderCartItems = () => {
    let finalPrice = 0
    const {itemsList} = this.state
    for (const i of itemsList) {
      finalPrice += i.cost * i.quantity
    }
    return (
      <>
        <div className="cart-items-box">
          <div className="t-header">
            <h1 className="t-h-item">Item</h1>
            <h1 className="t-h-item-1">Quantity</h1>
            <h1 className="t-h-item">Price</h1>
          </div>
          <ul className="cart-items-list">
            {itemsList.map(e => (
              <CartItem
                key={e.id}
                itemDetails={e}
                DeleteCartItem={this.DeleteCartItem}
                onRefresh={this.onRefresh}
              />
            ))}
            <hr className="cart-items-line" />
          </ul>
          <div className="total-price-box">
            <h1 className="order-total-text">Order Total:</h1>
            <div className="box">
              <h1 className="total-price">
                <BiRupee /> {finalPrice}
              </h1>
            </div>
          </div>
          <div className="plaord-ref-btn-box">
            <button className="place-order-btn" onClick={this.onPlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
          <Footer  />
      </>
    )
  }

  renderCartView = () => {
    const {itemsList, placeOrder} = this.state
    if (itemsList === null || itemsList.length === 0) {
      return this.renderEmptyCartView()
    }
    if (
      (itemsList !== null || itemsList.length !== 0) &&
      placeOrder === false
    ) {
      return this.renderCartItems()
    }
    return this.renderPaymentSuccessView()
  }

  render() {
    return (
      <div className="cart-container">
        <Header />
        <div className="cart-responsive-box">{this.renderCartView()}</div>
      </div>
    )
  }
}

export default Cart
