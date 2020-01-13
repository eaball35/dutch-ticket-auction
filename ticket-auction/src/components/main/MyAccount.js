import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
    };
  }
  


  render() {  
    if (this.props.currentUser) {
      
      const { redirect } = this.state;
      if (redirect !== undefined) {
        return <Redirect to={redirect}/>;
      }
      return (
        <section>
          <h2>{this.props.currentUser.username}'s TicketClock Account</h2>
          <ul>
            <li>
              <Link to={`/myaccount/edit/${this.props.currentUser.id}`}>Edit Account Settings</Link>
            </li>
            <li>
              <Link to={`/myaccount/delete/${this.props.currentUser.id}`}>Delete Account</Link>
            </li>
          </ul>
          <h2>Selling on TicketClock</h2>
          <ul>
            <li>
              <Link to={"/new-ticket"}>List New Tickets</Link>
            </li>
            <li>
              <Link to={`/myaccount/tickets/${this.props.currentUser.id}`}>Manage My Ticket Listings</Link>
            </li>
            <li>
              <Link to={`/seller-stats/${this.props.currentUser.id}`}>Seller Stats</Link>
            </li>
          </ul>
        </section>
      )
    } 
    return("");
  }
}

export default MyAccount;