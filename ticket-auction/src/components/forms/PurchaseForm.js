import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';

class PurchaseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
    };
  }
  
  purchase = () => {
    this.setState({redirect: "/order/id"})
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