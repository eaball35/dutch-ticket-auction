import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import TicketTable from './TicketTable';

class ManageMyTickets extends Component {
  render() {  
    if (this.props.currentUser) {
      return (
        <section>
          <h1>Manage Your Tickets</h1>
          <TicketTable url={`/tickets/user/${this.props.currentUser.id}`} show={true}/>
        </section>
      )
    } 
    return("");
  }
}

export default ManageMyTickets;