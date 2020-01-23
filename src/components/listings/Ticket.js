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

const base_url = `${SPRING_SECURITY.base_url}`
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
      timeLeft: 0,
    };
  }

  componentDidMount = () => {
      const ticketUrl = `${base_url}/tickets/${this.props.match.params.id}` 
      const priceUrl = `${base_url}/price?id=${this.props.match.params.id}`
      const timeLeftUrl = `${base_url}/hoursLeft?id=${this.props.match.params.id}`
      const headers = { 
        headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
      }

      this.fetchTicket(ticketUrl, headers);
      this.fetchCurrentPrice(priceUrl, headers);
      this.fetchTimeLeft(timeLeftUrl, headers);
  }

  fetchTimeLeft = (url ,headers) => {
    axios.get(url, headers)
    .then((response) => {
      this.setState({timeLeft: response.data})
    })
    .catch((error) => {
      this.setState({error: error.response})
    });
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
        this.setState({
          currentPrice: response.data.currentPrice,
          lastUpdated: new Date().toString()
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
      return (
        <div className="tab-details">
          <p><strong>Auction Details: </strong> {this.state.ticket.auctionDetails}</p>
          <p><strong>Auction Start: </strong>{dateFormat(this.state.ticket.auctionStart, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
          <p><strong>Auction End: </strong> {dateFormat(this.state.ticket.auctionEnd, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
          <p><strong>Start Price: </strong> ${(this.state.ticket.startTotalPrice/ this.state.ticket.ticketQuantity).toFixed(2)} ea - ${this.state.ticket.startTotalPrice} total </p>
          <p><strong>End Price: </strong>${(this.state.ticket.endTotalPrice/ this.state.ticket.ticketQuantity).toFixed(2)} ea - ${this.state.ticket.endTotalPrice} total</p>
          { (this.state.timeLeft > 0)
            ? <p>{this.state.timeLeft} hours left!</p>
            : null
          }
        </div>
        )
    } else if (this.state.detailsTab === 'venue') {
      return (
        <div className="tab-details">
          {this.state.ticket.event.venue.venueDetails}
        </div>
        )
    } else if (this.state.detailsTab === 'event') {
      return (
        <div className="tab-details">
          {this.state.ticket.event.eventDetails}
        </div>
        )
    }
  }
  
  strikePrice = () => {
    const priceUrl = `${base_url}/price?id=${this.props.ticketId}`
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
    if (this.state.ticket && this.state.ticket.status !== "new") {
      return <div className="unavailable">Ticket has already been purchased!</div>
    }

    const tabColor = (tab) => {
      if (this.state.detailsTab === "auction" && tab === "auction") {
        return "tab tab-active"
      } else if (this.state.detailsTab === "event" && tab === "event") {
        return "tab tab-active"
      } else if (this.state.detailsTab === "venue" && tab === "venue") {
        return "tab tab-active"
      } else {
        return "tab"
      }
    }

    
    const showTicket = () => {
      if (this.state.ticket !== undefined && this.state.currentPrice !== undefined ) { 
        // Ticket Fields
        const listingDetails = this.state.ticket;
        const imageUrls = listingDetails.event.imageUrls
        const performer = listingDetails.event.performer
        const title = listingDetails.event.title
        let user;
        if (listingDetails.user) {
          user = listingDetails.user.username
        } else {
          user = null
        }
        
        const eventStart = dateFormat(listingDetails.event.start, "dddd, mmmm dS, yyyy, h:MM TT")
        const ticketQuantity = listingDetails.ticketQuantity
        const ticketGrouping = listingDetails.ticketGrouping
        const venue = listingDetails.event.venue.title


        const city = listingDetails.event.venue.address.city.name
        const state = listingDetails.event.venue.address.city.state
        const listedAt = timeAgo.format(new Date(listingDetails.auctionStart))
        const price = (listingDetails.startTotalPrice).toFixed(2);
        const priceEa = (listingDetails.startTotalPrice/ticketQuantity).toFixed(2);
        const pitch = listingDetails.pitch
        const currentPrice = (this.state.currentPrice).toFixed(2);
        const currentPriceEa = (this.state.currentPrice/ticketQuantity).toFixed(2);
        const lastUpdated = timeAgo.format(new Date(this.state.lastUpdated));
        

        return (
          <section>
            <section className="ticket-details-container">
              { (imageUrls)
                ? <img src={imageUrls[0]} alt={title} className='event-img ticket-info-sect'/>
                :  <img src="https://images.squarespace-cdn.com/content/v1/57f0719c725e25e914a27b76/1476469701090-IYP1U1RNY0D3M72C5H3A/ke17ZwdGBToddI8pDm48kCIq0XyLJJk2FAWEONnCmDZZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzlBBQXEp281-O-7PPigqE00Dc4AsyuOsfxkxOwUQ9vmPojz-kpU2wdTDZ9661s8ZQ/events-heavenly-header.jpg?format=1500w" alt="default-event-img" className='event-img'/>
              }
                
              <section className="ticket-info-sect details-sect">
                <h6>TICKET LISTING {listingDetails.id.slice(-6).toUpperCase()}</h6>
                <h4>{eventStart}</h4>
                <h1>{title}</h1>
                { (performer)
                  ? <h2>{performer[0].name}</h2>
                  : null
                }
                <h4>{ticketQuantity} {ticketGrouping}</h4>
                <h2>@ {venue}  |  {city}, {state} </h2>
                <h6>Listed {listedAt} by {user} for <strong>${priceEa} ea</strong> - ${price} total</h6>
                <p>{pitch}</p>
              </section>

              <section className= "ticket-info-sect price-sect">
                <h4>Current Price</h4>
                <h2> ${currentPriceEa} <span>ea</span> </h2>
                <p>Total <strong>${currentPrice}</strong> + tax/fees</p>
                <p> last updated {lastUpdated} </p>
                { (this.state.timeLeft > 0)
                  ? <p><strong>{this.state.timeLeft} hours left!</strong></p>
                  : null
                }
                <button className='btn btn-success' onClick={this.strikePrice}> Buy TicketListing </button>
              </section>
            </section>

            <section className="details-tabs">
              <h2>Details</h2> 
              <span onClick={() => {this.tabClick('auction')}} className={tabColor("auction")}> Auction </span>
              <span onClick={() => {this.tabClick('event')}} className={tabColor("event")}> Event </span>
              <span onClick={() => {this.tabClick('venue')}}className={tabColor("venue")}> Venue </span>
              <section className="details">
                {this.chooseDetails()}
              </section>
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
