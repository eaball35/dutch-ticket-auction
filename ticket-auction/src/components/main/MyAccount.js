import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import '../../css/MyAccount.css'

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
        <section className="my-account-page-container">
          <div className="my-account">
            <h2>{this.props.currentUser.username}'s TicketClock Account</h2>
              <div>
                <Link to={`/myaccount/edit/${this.props.currentUser.id}`}>Edit My Account Settings</Link>
              </div>
              <div>
                <Link to={`/myaccount/delete/${this.props.currentUser.id}`}>Delete My Account</Link>
              </div>

          </div>
          <div className="my-seller">
            <h2>Selling on TicketClock</h2>
              <div>
                <Link to={"/new-ticket"}>List New Ticket Listings</Link>
              </div>
              <div>
                <Link to={`/myaccount/tickets/${this.props.currentUser.id}`}>Manage My Ticket Listings</Link>
              </div>
              <div>
                <Link to={`/seller-stats/${this.props.currentUser.id}`}>See My Seller Stats</Link>
              </div>
          </div>
        </section>
      )
    } 
    return("");
  }
}

export default MyAccount;