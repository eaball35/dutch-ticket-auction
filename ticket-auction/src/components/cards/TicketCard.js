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

  render() {
    const listingDetails = this.props.ticket
    const eventStart = dateFormat(listingDetails.event.start, "dddd, mmmm dS, yyyy, h:MM TT")

    const { redirect } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }

    
    return (
      <section className="ticketCard-container">
        { (listingDetails.event.imageUrls)
          ? <img src={listingDetails.event.imageUrls[0]} alt={this.props.ticket.event.title} className="ticketCard-icon-img"/>
          : <img src="https://images.squarespace-cdn.com/content/v1/57f0719c725e25e914a27b76/1476469701090-IYP1U1RNY0D3M72C5H3A/ke17ZwdGBToddI8pDm48kCIq0XyLJJk2FAWEONnCmDZZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzlBBQXEp281-O-7PPigqE00Dc4AsyuOsfxkxOwUQ9vmPojz-kpU2wdTDZ9661s8ZQ/events-heavenly-header.jpg?format=1500w" alt="default-event-img"/>
        }
        <div className="ticketCard-details">
          <h6>TICKET LISTING {listingDetails.id.slice(-6).toUpperCase()}</h6>
          <h4>{eventStart}</h4>
          <h2>{listingDetails.event.title} </h2>
          <h4>@ {listingDetails.event.venue.title} </h4>
          { (listingDetails.event.venue.address)
            ? <h5>{listingDetails.event.venue.address.city.name}, {listingDetails.event.venue.address.city.state}</h5>
            : null
          }
        </div>
      </section>
    )
  }
}

export default TicketCard;
