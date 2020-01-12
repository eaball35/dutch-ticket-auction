import React, { Component } from 'react';
import '../../css/Ticket.css';
import axios from 'axios';
import SPRING_SECURITY from '../../config_spring_keys.js'
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

var dateFormat = require('dateformat');
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsTab: 'auction',
      ticket: undefined,
      error: "",
      currentPrice: undefined,
      lastUpdated: null,
      redirect: undefined,
    };
  }

  componentDidMount = () => {
    if (!this.props.example) {
      const ticketUrl = `${base_url}/tickets/${this.props.match.params.id}` 
      const priceUrl = `${base_url}/price/${this.props.match.params.id}`
      const headers = { 
        headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
      }

      this.fetchTicket(ticketUrl, headers);
      this.fetchCurrentPrice(priceUrl, headers); 
    }
  }

  fetchTicket(url, headers) {
    axios.get(url, headers)
      .then((response) => {
        this.setState({ticket: response.data})
      })
      .catch((error) => {
        this.setState({error: error.response})
      });
  }

  fetchCurrentPrice(url, headers) {
    axios.get(url, headers)
      .then((response) => {
        const lastUpdated = new Date()
        this.setState({
          currentPrice: response.data.currentPrice,
          lastUpdated: lastUpdated.toString()
        })
      })
      .catch((error) => {
        this.setState({error: error.response})
      });
  }

  tabClick = (tab) => {
    if (tab === 'auction') {
      this.setState({detailsTab: 'auction'});
    } else if (tab === 'venue') {
      this.setState({detailsTab: 'venue'});
    } else if (tab === 'event') {
      this.setState({detailsTab: 'event'});
    };
  }

  chooseDetails = () => {
    if (this.state.detailsTab === 'auction') {
      return (this.state.ticket.auctionDetails)
    } else if (this.state.detailsTab === 'venue') {
      return (this.state.ticket.event.venue.venueDetails)
    } else if (this.state.detailsTab === 'event') {
      return (this.state.ticket.event.eventDetails)
    }
  }
  
  strikePrice = () => {
    const priceUrl = `${base_url}/price/${this.props.match.params.id}`
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    }
    this.fetchCurrentPrice(priceUrl, headers)
    this.props.addToCheckout({ 
      ticket: this.state.ticket, 
      strikePrice: this.state.currentPrice
    })
    this.setState({redirect: "/checkout"})
  } 

  render() {
    const showTicket = () => {
      if (this.state.ticket !== undefined && this.state.currentPrice !== undefined ) { 
        // Ticket Fields
        const listingDetails = this.state.ticket;
        const imageUrls = listingDetails.event.imageUrls
        const performer = listingDetails.event.performer[0].name
        const title = listingDetails.event.title
        const start = dateFormat(listingDetails.event.start, "dddd, mmmm dS, yyyy, h:MM TT")
        const ticketQuantity = listingDetails.ticketQuantity
        const ticketGrouping = listingDetails.ticketGrouping
        const venue = listingDetails.event.venue.title
        const city = listingDetails.event.venue.address.city.name
        const state = listingDetails.event.venue.address.city.state
        const createdAt = timeAgo.format(new Date(listingDetails.createdAt))
        const price = (listingDetails.startTotalPrice).toFixed(2);
        const priceEa = (listingDetails.startTotalPrice/ticketQuantity).toFixed(2);
        const overview = listingDetails.overview
        const currentPrice = (this.state.currentPrice).toFixed(2);
        const currentPriceEa = (this.state.currentPrice/ticketQuantity).toFixed(2);
        const lastUpdated = timeAgo.format(new Date(this.state.lastUpdated));
        

        return (
          <section>
            <section className="ticket-details-container">
                  <img src={imageUrls} alt={title} className='event-img ticket-info-sect'/>
                
              <section className="ticket-info-sect details-sect">
                <h1>{title}</h1>
                <h2>{performer}</h2>
                <h4>{start}</h4>
                <h4>{ticketQuantity} {ticketGrouping}</h4>
                <h2>@ {venue}  |  {city}, {state} </h2>
        <h4>Listed {createdAt} for <strong>${price} total</strong> <span> - ${priceEa} ea</span></h4>
                <p>{overview}</p>
              </section>

              <section className= "ticket-info-sect price-sect">
                <h4>Current Price</h4>
                <h2> ${currentPriceEa} <span>ea</span> </h2>
                <p>Total ${currentPrice} + tax/fees</p>
                <p> last updated {lastUpdated} </p>
                <button className='btn btn-success' onClick={this.strikePrice}> Strike Price </button>
              </section>
            </section>

            <section className="details-tabs">
              <button onClick={() => {this.tabClick('auction')}}> Auction </button>
              <button onClick={() => {this.tabClick('event')}}> Event </button>
              <button onClick={() => {this.tabClick('venue')}}> Venue </button>
            </section>
              
            <section className="details">
              {this.chooseDetails()}
            </section>

          </section>
        );
      } else {
        return "";
      }
    }

    const { redirect } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }

    return (
      <section>
        {showTicket()}
      </section>
    )
  }
}

export default Ticket;
