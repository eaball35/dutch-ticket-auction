import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
    };
  }
  
  checkout = () => {
    this.setState({redirect: "/checkout/purchase"})
  }

  render() {  
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

          <button className="btn btn-primary" onClick ={this.checkout}>Checkout</button>
        </div>
      )
    } 
    return ("Please select a ticket listing to checkout.")
  }
}

export default Checkout;