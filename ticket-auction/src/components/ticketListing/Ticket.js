import React, { Component } from 'react';
import '../../css/Ticket.css';
import axios from 'axios';

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
      this.fetchTicket();
      this.fetchCurrentPrice(); 
    }
  }

  fetchTicket() {
    axios.get(`http://localhost:8080/tickets/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ticket: response.data})
      })
      .catch((error) => {
        this.setState({errorDetails: error.response})
      });
  }

  fetchCurrentPrice() {
    axios.get(`http://localhost:8080/tickets/price/${this.props.match.params.id}`)
      .then((response) => {
        const lastUpdated = new Date()
        this.setState({
          currentPrice: response.data.currentPrice,
          lastUpdated: lastUpdated.toString()
        })
      })
      .catch((error) => {
        this.setState({errorDetails: error.response})
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
              
              <h2>@ {listingDetails.event.venue.title}  |  {listingDetails.event.venue.location.city}, {listingDetails.event.venue.location.state} </h2>
              
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
