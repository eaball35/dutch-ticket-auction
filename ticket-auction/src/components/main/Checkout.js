import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import SignInForm from '../forms/SignInForm';
import '../../css/Checkout.css'
import SPRING_SECURITY from '../../config_spring_keys.js'
import axios from 'axios';
const base_url = 'http://ticketclock.us-west-2.elasticbeanstalk.com'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
      login: false,
      guest: false,

      showAddressForm: false,
      useUserDetails: true,
      email: null,
      name: null,
      address1: null,
      address2: null,
      zipCode: null,
      city: null,
      state: null,

      shippingAddress: null,
      shippingCity: null,

    };
  }
  
  submitShippingDetails = () => {
    if (!this.props.currentUser || !this.props.currentUser.address || !this.state.useUserDetails) {
      this.fetchCity(this.state.city, this.state.state)
      this.createAddress()
    } else {
      this.setState({
        shippingAddress: this.props.currentUser.address,
        shippingCity: this.props.currentUser.address.city
      })
    }
  }

  completeCheckout = () => {    
    if (this.state.shippingAddress && this.state.shippingCity) {
      this.props.updateShippingAddress(this.state.shippingAddress)
      this.setState({redirect: "/checkout/purchase"})
    } 
  }

  updateAddressCity = () => {
    const data = this.state.shippingAddress
    data.city = this.state.shippingCity

    const url = `${base_url}/address`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}

    axios.post(url, data, headers)
    .then((response) => {
      console.log("success")
    })
    .catch((error) => {
      console.log(error.response);
    });

  }

  loginClick = () => {
    this.setState({login: true})
  }

  guestClick = () => {
    this.setState({guest: true})
  }


  fetchCity = (city, state) => {
    const url = `${base_url}/findCity?name=${city}&state=${state}`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}

    axios.get(url, headers)
    .then((response) => {
      if (response.data !== "" && response.data !== null) {
        this.setState({shippingCity: response.data}) 
      } else {
        this.createCity(city, state)
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
  }
  
  createAddress = () => {
    const url = `${base_url}/address`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    const data = {
      "address1": this.state.address1,
      "address2": this.state.address2,
      "city": null,
      "zipCode": this.state.zipCode,
    }

    axios.post(url, data, headers)
    .then((response) => {
      this.setState({shippingAddress: response.data})
    })
    .catch((error) => {
      console.log(error.response);
    });
  }

  createCity = (city, state) => {
    const url = `${base_url}/cities`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    const data = {
      "name": city,
      "state": state
    }

    axios.post(url, data, headers)
    .then((response) => {
      this.setState({shippingCity: response.data}) 
    })
    .catch((error) => {
      console.log(error.response);
    });
  }

  onInputChange = (event) => {
    const updatedState = {};
    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;  
    this.setState(updatedState);
  }

  onCheckboxChange = () => {
    this.setState({useUserDetails: !this.state.useUserDetails});
  }

  showUserDetails = () => {
    const {currentUser} = this.props
    if (currentUser) {
      return (
        <ul>
          <li><strong>Email: </strong> {currentUser.email}</li>
          <li><strong>Shipping Address: </strong></li>
          <li>{currentUser.name}</li>
          <li>{currentUser.address.address1} {currentUser.address.address2} </li>
          <li>{currentUser.address.city.name}, {currentUser.address.city.state}</li>
          <li>{currentUser.address.zipCode}</li>
        </ul>
        )
    }
  }

  showDetailsForm = () => {
    if (this.props.currentUser) {
      if (this.state.useUserDetails && this.props.currentUser.address) {
        return this.showUserDetails()
      } else {
        return this.showShippingAddressForm()
      }
    } else {
      return this.showShippingAddressForm()
    }
  }

  showShippingAddressForm = () => {
    return (
      <form>
        <div>
          <label htmlFor="email"> Email:  </label>
          <input
            name="email"
            onChange={this.onInputChange}
            value={this.state.email}
          />
        </div>
                      
        <div>
          <label htmlFor="name"> Name:  </label>
          <input
            name="name"
            onChange={this.onInputChange}
            value={this.state.name}
          />
        </div>
        <div>
          <label htmlFor="address1"> Address1:  </label>
          <input
            name="address1"
            onChange={this.onInputChange}
            value={this.state.address1}
          />
        </div>
        <div>
          <label htmlFor="address2"> Address2:  </label>
          <input
            name="address2"
            onChange={this.onInputChange}
            value={this.state.address2}
          />
        </div>
        <div>
          <label htmlFor="zipCode"> Zip Code: </label>
          <input
            name="zipCode"
            onChange={this.onInputChange}
            value={this.state.zipCode}
          />
        </div>
        <div>
          <label htmlFor="city"> City:  </label>
          <input
            name="city"
            onChange={this.onInputChange}
            value={this.state.city}
          />
        </div>
        <div>
          <label htmlFor="state"> State: </label>
          <input
            name="state"
            onChange={this.onInputChange}
            value={this.state.state}
          />
        </div>
      </form>
    )
  }

  showCCDetailsForm = () => {
    return (
      <form>
        <h4>Payment Details</h4>
        <div>
          <div>
            <label htmlFor="ccType"> CC Type: </label>
            <input
              name="ccType"
              onChange={this.onInputChange}
              value={this.state.ccType}
            />
          </div>
          <label htmlFor="ccNum"> CC Number: </label>
          <input
            name="ccNum"
            onChange={this.onInputChange}
            value={this.state.ccNum}
          />
        </div>
        <div>
          <label htmlFor="ccExp"> CC Exp: </label>
          <input
            name="ccExp"
            onChange={this.onInputChange}
            value={this.state.ccExp}
          />
        </div>
        <div>
          <label htmlFor="ccCSV"> CC CSV: </label>
          <input
            name="ccCSV"
            onChange={this.onInputChange}
            value={this.state.ccCSV}
          />
        </div>
    </form>
  )}


  showShippingAddress = () => {
    if (this.state.shippingAddress && this.state.shippingCity) {
      this.updateAddressCity()
      return (
        <div>
          <h2>Shipping Details</h2>
          <ul>
            <li> Shipping Address: {this.state.shippingAddress.address1}</li>
            <li> Shipping City: {this.state.shippingCity.name}</li>
          </ul>
        </div>
      )
    }
  }

  enterDetails = () => {
    return (
      <div>
        <section className="purchase-form">
          <h2>Enter Shipping & Email Details to Checkout</h2>
          { (this.props.currentUser && this.props.currentUser.address)
            ? <form>
              <label>
                Same as your TicketClock user details?
                <input
                  name="useUserDetails"
                  type="checkbox"
                  checked={this.state.useUserDetails}
                  onChange={this.onCheckboxChange} />
              </label>
            </form>
            : null
          }
          {this.showDetailsForm()}
          {this.showCCDetailsForm()}
        </section>
        <button className="btn btn-primary" onClick ={this.submitShippingDetails}>Submit Details</button>
      </div>
    )
  }

  endingS = (num) => {
    if (num == 1) {
      return ""
    } else {
      return "s"
    }
  }

  render() {  
    const checkoutButton = () => {
      if (this.state.shippingAddress && this.state.shippingCity) {
        return (
          <div>
            {this.showShippingAddress()}
            <button className="btn btn-success" onClick={this.completeCheckout}>Checkout</button>
          </div>
        )
      } else if (!this.props.currentUser) {
        if(!this.state.guest && !this.state.login ) {
          return (
            <div>
              <h4>Are you ready to checkout?</h4>
              <button className="btn btn-secondary login-btn" onClick={this.loginClick}>Login First</button>
              <button className="btn btn-primary guest-checkout-btn" onClick={this.guestClick}>Guest Checkout</button>
            </div>
          )
        } else if (this.state.login) {
          return <SignInForm updateCurrentUser={this.props.updateLoginUser} redirect="/checkout/purchase"/>
        } else {
          return this.enterDetails()
        }
      }  else {
        return (
          this.enterDetails()
        )
      }
    }
    
    if (this.props.cartTicket) {
      const ticket = this.props.cartTicket.ticket
      const strikePrice = (this.props.cartTicket.strikePrice).toFixed(2);
      const ticketQuantity =  ticket.ticketQuantity
      const title =  ticket.event.title
      
      const { redirect } = this.state;
      if (redirect !== undefined) {
        return <Redirect to={redirect}/>;
      }
      return (
        <div className="checkout-container">
          {console.log(this.state.shippingAddress)}
          {console.log(this.state.shippingCity)}
          <div className="congrats-checkout-container">
            <h2>Congratulations you striked at a total price of ${strikePrice} for {ticketQuantity} ticket{this.endingS(ticketQuantity)} to {title}! </h2>
            <TicketCard ticket={ticket} className="checkout-ticketCard"/>
          </div>

          <div className="ready-to-checkout-container">
            {checkoutButton()}
          </div>
        </div>
      )
    } 
    return ("Please select a ticket listing to checkout.")
  }
}

export default Checkout;