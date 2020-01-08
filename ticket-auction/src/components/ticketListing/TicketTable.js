import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';

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
      this.fetchTickets();
    }
  }

  fetchTickets() {
    axios.get(`http://localhost:8080${this.props.url}`)
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
