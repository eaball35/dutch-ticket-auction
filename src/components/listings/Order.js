import React, { Component } from 'react';
import axios from 'axios';
import SPRING_SECURITY from '../../config_spring_keys.js'
import TicketCard from '../cards/TicketCard'
import '../../css/Order.css'

const base_url = 'http://ticketclock.us-west-2.elasticbeanstalk.com'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {     
      order: undefined,
      error: null,
    };
  }

  componentDidMount = () => {
    if  (this.props.orderId) {
      const url = `${base_url}/orders/${this.props.orderId}`  
      this.fetchOrder(url);
    }
  }

  fetchOrder = (url) => {
    axios.get(url,
      { headers: 
        { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
      }
    ).then((response) => {
      this.setState({order: response.data})
    })
    .catch((error) => {
      this.setState({error: error.response})
    });
  }


render() {
    const showOrder = () => {
      if(this.state.order) {
        return (
          <section className="order-container">
            <header>
              <h1> Congratulations your order was placed!</h1>
              <h2> {this.state.order.ticketListing.ticketQuantity} Tickets to {this.state.order.ticketListing.event.title}</h2>
              <h4>Order: {this.state.order.id} </h4>
              <p>Please await an email for follow up details. Thank you for using TicketClock!</p>
            </header>
            <TicketCard ticket={this.state.order.ticketListing}/>
            <h4>Total Cost: ${(this.state.order.totalCost).toFixed(2)} - paid</h4> 
          </section>
        )
        
      } else {
        return "";
      }
    }

    return (showOrder())
  }
}

export default Order;
