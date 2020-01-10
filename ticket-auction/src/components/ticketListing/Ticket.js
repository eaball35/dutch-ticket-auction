import React, { Component } from 'react';
import '../../css/Ticket.css';
import axios from 'axios';
import SPRING_SECURITY from '../../config_keys.js'

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
  render() {
    const ticketNum = () => {
      if (!this.props.example) {
        const tNum = this.props.match.params.id
        return (<h6>Ticket ID {tNum}</h6>)
      }
    }
    

    const showTicket = () => {
      if (this.state.ticket !== undefined && this.state.currentPrice !== undefined ) { 
        // Ticket Fields
        const listingDetails = this.state.ticket;
        const imageUrls = listingDetails.event.imageUrls
        const performer = listingDetails.event.performer[0].name
        const title = listingDetails.event.title
        const start = listingDetails.event.start
        const ticketQuantity = listingDetails.ticketQuantity
        const ticketGrouping = listingDetails.ticketGrouping
        const venue = listingDetails.event.venue.title
        const city = listingDetails.event.venue.address.city.name
        const state = listingDetails.event.venue.address.city.state
        const createdAt = listingDetails.createdAt
        const priceEach = (listingDetails.startTotalPrice/ticketQuantity).toFixed(2);
        const overview = listingDetails.overview
        const currentPrice = (this.state.currentPrice).toFixed(2);
        const currentPriceEa = (currentPrice/ticketQuantity).toFixed(2);
        const lastUpdated = this.state.lastUpdated
        

        return (
          <section>
            <section className="ticket-details-container">
              <section className="ticket-info-sect">
                {ticketNum()}
                <img src={imageUrls} alt={title} className='event-img'/>
                <h1>{title}</h1>
                <h2>{performer}</h2>
                <h4>{start}  |  {ticketQuantity} {ticketGrouping} </h4>
                <h2>@ {venue}  |  {city}, {state} </h2>
                <h4>Listed {createdAt} for <strong>${priceEach}</strong> <span>ea</span></h4>
                <p>{overview}</p>
              </section>

              <section className= "ticket-info-sect">
                <h4>Current Price</h4>
                <h2> ${currentPriceEa} <span>ea</span> </h2>
                <p>Total ${currentPrice}</p>
                <p> last updated {lastUpdated} </p>
                <button className='btn btn-secondary'> Buy Now </button>
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
  
    return (
      <section>
        {showTicket()}
      </section>
    )
  }
}

export default Ticket;
