import React, { Component } from 'react';
import Ticket from './Ticket'

const exampleTicket = {
  createdAt: '3 days ago',
  updatedAt: 'December 26, 2019 04:18:00',
  userId: 1234,
  eventDetails: {
    artist: 'Cliche Artist',
    event: 'The Capstone Tour 2020',
    imgUrls: ['https://posterhouse.org/wp-content/uploads/2019/08/H0849-L71392902.jpg'],
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


class NewTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdAt: this.props.exampleTicket.createdAt,
      updatedAt: this.props.exampleTicket.updatedAt,
      userId: this.props.exampleTicket.userId,
      
      artist: this.props.exampleTicket.eventDetails.artist,
      event: this.props.exampleTicket.eventDetails.event,
      eventImgUrls: this.props.exampleTicket.eventDetails.imgUrls,
      eventLocation: this.props.exampleTicket.eventDetails.location,
      eventCity: this.props.exampleTicket.eventDetails.city,
      eventState: this.props.exampleTicket.eventDetails.state,
      eventDate: this.props.exampleTicket.eventDetails.date,
      eventStartTime: this.props.exampleTicket.eventDetails.startTime,
      eventEndTime: this.props.exampleTicket.eventDetails.endTime,
      eventDetails: this.props.exampleTicket.eventDetails.details,
      
      ticketQuantity: this.props.exampleTicket.ticketDetails.quantity,
      ticketGrouping: this.props.exampleTicket.ticketDetails.grouping,
      ticketDetails: this.props.exampleTicket.ticketDetails.details,
      
      auctionStartTotalPrice: this.props.exampleTicket.auctionDetails.start.totalPrice,
      auctionStartDate: this.props.exampleTicket.auctionDetails.start.date,
      auctionStartTime: this.props.exampleTicket.auctionDetails.start.time,
      auctionEndTotalPrice: this.props.exampleTicket.auctionDetails.end.totalPrice,
      auctionEndDate: this.props.exampleTicket.auctionDetails.end.date,
      auctionEndTime: this.props.exampleTicket.auctionDetails.end.time,
      auctionOverview: this.props.exampleTicket.auctionDetails.overview,
      auctionDetails: this.props.exampleTicket.auctionDetails.details,

      newTicket: this.props.exampleTicket,
    };
  }

  updateNewTicket = () => {
    const newTicket = {
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      userId: this.state.userId,
      eventDetails: {
        artist: this.state.artist,
        event: this.state.event,
        img_urls: this.state.img_urls,
        location: this.state.eventLocation,
        city: this.state.eventCity,
        state: this.state.eventState,
        date: this.state.eventDate,
        startTime: this.state.eventStartTime,
        endTime: this.state.eventEndTime,
        details: this.state.eventDetails
      },
      ticketDetails: {
        quantity: this.state.ticketQuantity,
        grouping: this.state.ticketGrouping,
        details: this.state.ticketDetails
      },
      auctionDetails: {
        start: {
          totalPrice: this.state.auctionStartTotalPrice,
          date: this.state.auctionStartDate,
          time: this.state.auctionStartTime,
        },
        end: {
          totalPrice: this.state.auctionEndTotalPrice,
          date: this.state.auctionEndDate,
          time: this.state.auctionEndTime,
        },
        overview: this.state.auctionOverview,
        details: this.state.auctionDetails
      }
    }

    this.setState({newTicket})
  }
  
  
  
  onInputChange = (event) => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(
      updatedState, () => {
      this.updateNewTicket();
    });


    
  }

  onSubmitTicket = () => {

  }
  
  
  render() {
    return (
      <section>
        <form onSubmit={this.onSubmitTicket}>
          <div>
            <label htmlFor="artist"> Artist: </label>
            <input
              name="artist"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="event"> Event: </label>
            <input
              name="event"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="eventLocation"> Location: </label>
            <input
              name="eventLocation"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="city"> City: </label>
            <input
              name="eventCity"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="eventState"> State: </label>
            <input
              name="eventState"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="eventDate"> Date: </label>
            <input
              name="eventDate"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="eventStartTime"> Start Time: </label>
            <input
              name="eventStartTime"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="eventEndTime"> End Time: </label>
            <input
              name="eventEndTime"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>

          <div>
            <label htmlFor="eventDetails"> Details: </label>
            <input
              name="eventDetails"
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </div>
        </form>

        <Ticket ticket={this.state.newTicket} example={true}/>
      </section>
    )
  }
}

export default NewTicket;
