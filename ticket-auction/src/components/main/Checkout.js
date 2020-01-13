import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import SignInForm from '../forms/SignInForm';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
      login: false,
    };
  }
  
  checkout = () => {
    this.setState({redirect: "/checkout/purchase"})
  }

  loginClick = () => {
    this.setState({login: true})
  }

  render() {  
    const checkoutButton = () => {
      if (!this.props.currentUser) {
        if(!this.state.guest && !this.state.login) {
          return (
            <div>
              <button className="btn btn-primary" onClick={this.checkout}>Guest Checkout</button>
              <button className="btn btn-secondary" onClick={this.loginClick}>Login</button>
            </div>
          )
        } else if (this.state.login) {
          return <SignInForm updateCurrentUser={this.props.updateLoginUser} redirect="/checkout/purchase"/>
        }
      } else {
        return (
          <div>
            <button className="btn btn-primary" onClick ={this.checkout}>Checkout</button>
          </div>
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
        <div>
          <TicketCard ticket={ticket}/>
          
          <h2>Congratulations you striked at a price of ${strikePrice} for {ticketQuantity} tickets to {title} </h2>

          <h4>Are you ready to purchase?</h4>

          {checkoutButton()}
        </div>
      )
    } 
    return ("Please select a ticket listing to checkout.")
  }
}

export default Checkout;