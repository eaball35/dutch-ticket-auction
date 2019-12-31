import React, { Component } from 'react';
import './Ticket.css';

class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsTab: 'auction'
    };
  }

  tabClick = (tab) => {
    if (tab === 'auction') {
      this.setState({detailsTab: 'auction'});
    } else if (tab === 'ticket') {
      this.setState({detailsTab: 'ticket'});
    } else if (tab === 'event') {
      this.setState({detailsTab: 'event'});
    };
  }

  chooseDetails = () => {
    if (this.state.detailsTab === 'auction') {
      return (this.props.ticket.auctionDetails.details)
    } else if (this.state.detailsTab === 'ticket') {
      return (this.props.ticket.ticketDetails.details)
    } else if (this.state.detailsTab === 'event') {
      return (this.props.ticket.eventDetails.details)
    }
  }

  render() {
    const eventDetails = this.props.ticket.eventDetails
    const ticketDetails = this.props.ticket.ticketDetails
    const auctionDetails = this.props.ticket.auctionDetails
    
    
    const ticketNum = () => {
      if (!this.props.example) {
        const tNum = this.props.match.params.ticketnum
        return (<h6>Ticket #: {tNum}</h6>)
      }
    }

    return (
      <section>
        <section>
          {console.log(this.props.ticket)}
          {ticketNum()}
          <img src={eventDetails.imgUrls} alt={eventDetails.event} className='event-img'/>
          <h1>{eventDetails.artist} - {eventDetails.event}</h1>
          <h4>{eventDetails.date}  |  {ticketDetails.quantity} {ticketDetails.grouping} </h4>
          <h2>@ {eventDetails.location}  |  {eventDetails.city}, {eventDetails.state} </h2>
          <h4>Listed {this.props.ticket.createdAt} for ${auctionDetails.start.totalPrice/ticketDetails.quantity} <span>ea</span></h4>
          <p>{auctionDetails.overview}</p>
        </section>

        <section>
          <h4>Current Price</h4>
          <h6>$109.99 <span>ea</span></h6>
          <p>last updated 2 min ago</p>
          <button className='btn btn-secondary'>Buy Now</button>
        </section>

        <section>
          <button onClick={() => {this.tabClick('auction')}}>Auction</button>
          <button onClick={() => {this.tabClick('ticket')}}>Ticket</button>
          <button onClick={() => {this.tabClick('event')}}>Event</button>
          
          <section>
            {this.chooseDetails()}
          </section>
        </section>
        
      </section>
    )
  }
}

export default Ticket;
