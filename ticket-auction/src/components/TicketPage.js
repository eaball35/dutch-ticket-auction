import React, { Component } from 'react';
import './TicketPage.css';

const exampleTicket = {
  createdAt: '3 days ago',
  updatedAt: 'December 26, 2019 04:18:00',
  userId: 1234,
  eventDetails: {
    artist: 'Cliche Artist',
    event: 'The Capstone Tour 2020',
    img_urls: ['https://posterhouse.org/wp-content/uploads/2019/08/H0849-L71392902.jpg'],
    location: 'Hipster Ballroom',
    city: 'Seattle',
    state: 'WA',
    date: 'Mon - Jan 01, 2020',
    startTime: '8:00',
    endTime: null,
    details:'Event Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  ticketDetails: {
    quantity: 2,
    grouping: 'together',
    details: 'Ticket Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  auctionDetails: {
    start: {
      totalPrice: 259.99,
      date: 'Mon - Jan 01, 2020',
      time: '8:00'
    },
    end: {
      totalPrice: 17.99,
      date: 'Mon - Jan 05, 2020',
      time: '8:00'
    },
    overview: 'Auction Overview: Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    details: 'Auction Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
}


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
      return (exampleTicket.auctionDetails.details)
    } else if (this.state.detailsTab === 'ticket') {
      return (exampleTicket.ticketDetails.details)
    } else if (this.state.detailsTab === 'event') {
      return (exampleTicket.eventDetails.details)
    }
  }

  render() {
    const eventDetails = exampleTicket.eventDetails
    const ticketDetails = exampleTicket.ticketDetails
    const auctionDetails = exampleTicket.auctionDetails
    const ticketNum = this.props.match.params.ticketnum

    return (
      <section>
        <section>
          <h6>Ticket #: {ticketNum}</h6>
          <img src={eventDetails.img_urls[0]} alt={eventDetails.event} className='event-img'/>
          <h1>{eventDetails.artist} - {eventDetails.event}</h1>
          <h4>{eventDetails.date}  |  {ticketDetails.quantity} {ticketDetails.grouping} </h4>
          <h2>@ {eventDetails.location}  |  {eventDetails.city}, {eventDetails.state} </h2>
          <h4>Listed {exampleTicket.createdAt} for ${auctionDetails.start.totalPrice/ticketDetails.quantity} <span>ea</span></h4>
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
        </section>
        
        <section>
          {this.chooseDetails()}
        </section>

      </section>
    )
  }
}

export default Ticket;
