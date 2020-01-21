import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import SPRING_SECURITY from '../../config_spring_keys.js'
import '../../css/PurchaseForm.css';


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
      

      fetchedCity: null,
    };
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
    const data = this.props.cartTicket.ticket
    data.status = "paid"
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}

    axios.post(url, data, headers)
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
  
  purchase = () => {
    // hard coded 10% tax rate & 2% fees
    const strikePrice = this.props.cartTicket.strikePrice
    let user, shippingAddress;

    if (this.props.currentUser) {
      user = this.props.currentUser
    } else if (this.state.guestUser){
      user = this.state.guestUser
    }

    shippingAddress = this.props.shippingAddress

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


  render() {  
    if (this.props.cartTicket) {
      const strikePrice = this.props.cartTicket.strikePrice
      const { redirect } = this.state;
      if (redirect !== undefined) {
        return <Redirect to={redirect}/>;
      }
      return (
        <div className="purchase-container">
          <h2> Everything look good? Click purchase to submit your order.</h2>
          <TicketCard ticket={this.props.cartTicket.ticket}/> 
          <h4>Strike Price: ${strikePrice.toFixed(2)}</h4>
          <h4>Total Cost w Tax & Fees: ${((strikePrice + (strikePrice * 0.02 )) * 1.1).toFixed(2)}</h4>
          <button className="btn btn-primary" onClick ={this.purchase}>Purchase</button>
        </div>
      )
    } 
    return ("Please select a ticket listing to checkout.")
  }
}

export default PurchaseForm;