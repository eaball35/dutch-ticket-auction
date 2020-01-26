import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import SPRING_SECURITY from '../../config_spring_keys.js'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import '../../css/TicketTable.css';

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const base_url = `${SPRING_SECURITY.base_url}`
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class TicketTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: [],
      error: ""
    };
  }

  componentDidMount = () => {
    if (this.props.url) {
      const url = `${base_url}${this.props.url}`
      const headers = { 
        headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
      }
      this.fetchTickets(url, headers);
    }
  }

  fetchTickets(url, headers) {
    axios.get(url, headers)
      .then((response) => {
        this.setState({tickets: response.data})
      })
      .catch((error) => {
        this.setState({error: error.response})
      });
  }

  // showNotPaid = (ticket) => {
  //   if (ticket.status !== "paid" && this.props.noshow)
  // }

  render() {
      let ticketTable;
      
      if (this.state.tickets !== []) {
        ticketTable = this.state.tickets.map((ticket, i) => {
            if (ticket.status !== "new" && !this.props.show) {
              return ("")
            } else if (ticket.status === "new") {
              return (
                <tr key={i}>
                  <td><Link to={`/tickets/${ticket.id}`}>Ticket ID ...{ticket.id.slice(-6)} </Link></td>
                  <td>{ticket.ticketQuantity}</td>
                  <td>{ticket.user.username}</td>
                  <td> {timeAgo.format(new Date(ticket.createdAt))}</td>
                  <td> ${(ticket.startTotalPrice/ ticket.ticketQuantity).toFixed(2)}</td>
                </tr>
              )
            } else if (ticket.status !== "new" && this.props.show)  {
                return (
                  <tr key={i}>
                    <td><Link to={`/tickets/${ticket.id}`}>Ticket ID ...{ticket.id.slice(-6)} - {ticket.status} </Link></td>
                    <td>{ticket.ticketQuantity}</td>
                    <td>{ticket.user.username}</td>
                    <td> {timeAgo.format(new Date(ticket.createdAt))}</td>
                    <td> ${(ticket.startTotalPrice/ ticket.ticketQuantity).toFixed(2)}</td>
                  </tr>
                )
            } else {
              return (<div className="unavailable">No tickets available </div>)
            }
        });
      } else {
        ticketTable = <div className="unavailable">No tickets available </div>
      }
  
    return (
      <section className="ticketTable-container">
        <table className="table">
          <thead>
            <tr>
              <th>Ticket Listings</th>
              <th>Quantity</th>
              <th>Seller</th>
              <th>Posted</th>
              <th>Start Price (per unit)</th>
            </tr>
          </thead>
          <tbody>
            {ticketTable}
          </tbody>
        </table>
      </section>
    )
  }
}

export default TicketTable;
