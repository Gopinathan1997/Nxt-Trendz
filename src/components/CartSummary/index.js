import {Component} from 'react'
import Popup from 'reactjs-popup'
import Payment from '../Payment'
import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {payment: '', isSelected: false}

  doPayment = () => {
    this.setState(prev => ({isSelected: !prev.isSelected}))
  }

  changePayment = event => {
    this.setState({payment: event.target.value})
  }

  content = () => {
    const {isSelected, payment} = this.state
    return (
      <>
        {isSelected ? (
          <div className="popup-background">
            <p>Your order has been placed successfully</p>
          </div>
        ) : (
          <>
            <div className="popup-background">
              <h1>Select a Payment Method</h1>

              <input
                type="radio"
                name="payment"
                id="card"
                value="Card"
                onChange={this.changePayment}
              />
              <label htmlFor="card">Card</label>

              <br />

              <input
                type="radio"
                name="payment"
                id="wallet"
                value="Wallet"
                onChange={this.changePayment}
              />
              <label htmlFor="wallet">Wallet</label>
              <br />

              <input
                type="radio"
                name="payment"
                id="upi"
                value="UPI"
                onChange={this.changePayment}
              />
              <label htmlFor="upi">UPI</label>
              <br />

              <input
                type="radio"
                name="payment"
                id="cash"
                value="cash"
                onChange={this.changePayment}
              />
              <label htmlFor="cash">Card</label>
              <br />
              <br />

              {payment === 'cash' ? (
                <button
                  type="button"
                  className="trigger-button checkout-button d-sm-none"
                  onClick={this.doPayment}
                >
                  Confirm Order
                </button>
              ) : (
                <button
                  type="button"
                  className="trigger-button checkout-button d-sm-none"
                  disabled
                  onClick={() => this.close}
                >
                  Confirm Order
                </button>
              )}
            </div>
          </>
        )}
      </>
    )
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
          })

          return (
            <>
              <div className="cart-summary-container">
                <h1 className="order-total-value">
                  <span className="order-total-label">Order Total:</span> Rs{' '}
                  {total}
                  /-
                </h1>
                <p className="total-items">{cartList.length} Items in cart</p>
                <Popup
                  modal
                  trigger={
                    <button type="button" className="checkout-button d-sm-none">
                      Checkout
                    </button>
                  }
                >
                  {close => <Payment close={close} />}
                </Popup>
                <Popup
                  modal
                  trigger={
                    <button type="button" className="checkout-button d-lg-none">
                      Checkout
                    </button>
                  }
                >
                  {close => <Payment close={close} />}
                </Popup>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartSummary
