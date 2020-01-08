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
    const listingDetails = this.state.ticket;

    const showTicket = () => {
      if (this.state.ticket !== undefined) {
        return (
          <section>
            <section>
              {ticketNum()}
              <img src={listingDetails.event.imageUrls} alt={listingDetails.event.title} className='event-img'/>
              
              <h1>{listingDetails.event.artist} - {listingDetails.event.title}</h1>
              
              <h4>{listingDetails.event.start}  |  {listingDetails.ticketQuantity} {listingDetails.ticketGrouping} </h4>
              
              <h2>@ {listingDetails.event.venue.title}  |  {listingDetails.event.venue.address.city.name}, {listingDetails.event.venue.address.city.state} </h2>
              
              <h4>Listed {listingDetails.createdAt} for ${listingDetails.startTotalPrice/listingDetails.ticketQuantity} <span>ea</span></h4>
              
              <p>{listingDetails.overview}</p>
            </section>

            <section>
              <h4>Current Price</h4>
              <h2> ${this.state.currentPrice/listingDetails.ticketQuantity} <span>ea</span></h2>
              <p>last updated {this.state.lastUpdated}</p>
              <button className='btn btn-secondary'>Buy Now</button>
            </section>

            <section>
              <button onClick={() => {this.tabClick('auction')}}>Auction</button>
              <button onClick={() => {this.tabClick('event')}}>Event</button>
              <button onClick={() => {this.tabClick('venue')}}>Venue</button>
              
              <section>
                {this.chooseDetails()}
              </section>
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
        {console.log(this.props)}
      </section>
    )
  }
}

export default Ticket;
