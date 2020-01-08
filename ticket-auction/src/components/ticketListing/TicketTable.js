import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import SPRING_SECURITY from '../../config_keys.js'

const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class TicketTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: undefined,
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

  render() {
      let ticketTable = "";
      
      if (this.state.tickets !== undefined) {
        ticketTable = this.state.tickets.map((ticket, i) => {
          return (
            <tr key={i}>
              <td><Link to={`/tickets/${ticket.id}`}>{ticket.id} </Link></td>
              <td>{ticket.event.venue.address.city.name}</td>
            </tr>
          )
        });
      } else {
        return ticketTable;
      }
  
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {ticketTable}
        </tbody>
      </table>
    )
  }
}

export default TicketTable;
