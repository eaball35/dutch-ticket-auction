import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import '../../css/TicketCard.css'
import { render } from '@testing-library/react';
var dateFormat = require('dateformat');

class TicketCard extends Component  {    
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
    };
  }

  onClick = () => {
    this.setState({redirect: "/tickets/" + this.props.ticket.id})
  }

  render() {
    const start = dateFormat(this.props.ticket.event.start, "mmm dd")

    const { redirect } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }
    return (
      <section className="ticketCard-container" onClick={this.onClick}>
        <h2>{start}</h2>
        <img src={this.props.ticket.event.imageUrls[0]} alt={this.props.ticket.event.title} className="ticketCard-icon-img"/>
        <div className="ticketCard-details">
          <h2>{this.props.ticket.event.title} </h2>
        </div>
      </section>
    )
  }
}

export default TicketCard;
