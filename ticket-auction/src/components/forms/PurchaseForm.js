import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import SPRING_SECURITY from '../../config_spring_keys.js'


const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class PurchaseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
    };
  }
  
  updateTicketListingStatus = (orderId) => {
    const url = "http://localhost:8080/tickets"
    const ticketListing = this.props.cartTicket.ticket
    ticketListing["status"] = "paid"

    console.log(ticketListing)

    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    } 

    axios.post(url, {ticketListing}, headers)
    .then((response) => {
      this.setState({redirect: `/orders/${orderId}`})
    })
    .catch((error) => {
      console.log(error.response);
    });
  
  }
  
  createOrder = (data) => {
    const url = "http://localhost:8080/orders"
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    } 

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
    const newOrder = {
      "user": this.props.currentUser,
      "ticketListing": this.props.cartTicket.ticket,
      "strikePrice": strikePrice,
      "totalCost": (strikePrice + (strikePrice * 0.02 )) * 1.1,
      "ccDetails": "",
      "shippingAddress": this.props.currentUser.address
    }
    this.createOrder(newOrder)
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
          <button className="btn btn-primary" onClick ={this.purchase}>Purchase</button>
        </div>
      )
    } 
    return ("Please select a ticket listing to checkout.")
  }
}

export default PurchaseForm;