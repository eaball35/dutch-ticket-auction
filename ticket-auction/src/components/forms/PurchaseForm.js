import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import SPRING_SECURITY from '../../config_spring_keys.js'
var zipcodes = require('zipcodes');


const base_url = 'http://ticketclock.us-west-2.elasticbeanstalk.com'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class PurchaseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
      shippingAddress: undefined,
      guestUser: undefined,

      useUserDetails: true,
      email: null,
      name: null,
      address1: null,
      address2: null,
      zipCode: null,
      city: null,
      state: null,

      fetchedCity: null,
    };
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

  componentDidMount = () => {
    if(!this.props.currentUser) {
      this.createGuestUser()
    }
  }

  createGuestUser = () => {
    const url = `${base_url}/users`
    const data = { "username": "Guest", "email": null,}
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password)} } 
    axios.post(url, data, headers)
      .then((response) => {
        this.setState({
          guestUser: response.data
        })
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  
  updateTicketListingStatus = (orderId) => {
    const url = `${base_url}/tickets`
    const ticketListing = this.props.cartTicket.ticket
    ticketListing["status"] = "paid"
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}

    axios.post(url, ticketListing, headers)
    .then((response) => {
      this.setState({redirect: `/orders/${orderId}`})
    })
    .catch((error) => {
      console.log(error.response);
    });
  }
  
  createOrder = (data) => {
    const url = `${base_url}/orders`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}

    axios.post(url, data, headers)
    .then((response) => {
      this.updateTicketListingStatus(response.data.id)
    })
    .catch((error) => {
      console.log(error.response);
    });
  }

  fetchCity = (city) => {
    const url = `${base_url}/cities/name/${city}`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}

    axios.get(url, headers)
    .then((response) => {
      this.setState({fetchedCity: response.data}) 
    })
    .catch((error) => {
      console.log(error.response);
    });
  }

  
  purchase = () => {
    // hard coded 10% tax rate & 2% fees
    const strikePrice = this.props.cartTicket.strikePrice
    let user, shippingAddress;

    if (this.props.currentUser) {
      user = this.props.currentUser
    } else if (this.state.guestUser){
      user = this.state.guestUser
    }

    if (this.state.useUserDetails && this.props.currentUser) {
      shippingAddress = this.props.currentUser.address
    } else {
      const city = (zipcodes.lookup(this.state.zipCode)).city
      const cityObj = this.fetchCity(city)

      shippingAddress = { 
          "address1": this.state.address1,
          "address2": this.state.address2,
          "city": cityObj,
          "zipCode": this.state.zipCode
        }
    }

    const newOrder = {
      "user": user,
      "ticketListing": this.props.cartTicket.ticket,
      "strikePrice": strikePrice,
      "totalCost": (strikePrice + (strikePrice * 0.02 )) * 1.1,
      "ccDetails": "",
      "shippingAddress": shippingAddress
    }
    this.createOrder(newOrder)
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
      if (this.state.useUserDetails) {
        return this.showUserDetails()
      } else {
        return this.showShippingAddressForm()
      }
    } else {
      return this.showShippingAddressForm()
    }
  }

  render() {  
    if (this.props.cartTicket) {
      const { redirect } = this.state;
      if (redirect !== undefined) {
        return <Redirect to={redirect}/>;
      }
      return (
        <div>
          <TicketCard ticket={this.props.cartTicket.ticket}/>
          
          <section className="purchase-form">
            <h4>Shipping & Email Details</h4>
            
            { (this.props.currentUser)
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
        </section>
          
          
          <button className="btn btn-primary" onClick ={this.purchase}>Purchase</button>
        </div>
      )
    } 
    return ("Please select a ticket listing to checkout.")
  }
}

export default PurchaseForm;