import React, { Component } from 'react';
import Ticket from './Ticket'

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
    this.updateNewTicket();
  }
  
  
  render() {
    const eventStates = ["artist", "event", "eventLocation", "eventCity", "eventState", "eventDate", "eventStartTime", "eventEndTime", "eventDetails"]
    const eventLabels = ["Artist", "Event", "Location", "City", "State", "Date", "Start Time", "End Time", "Details"]
    const ticketStates = ["ticketQuantity", "ticketGrouping", "ticketDetails"]
    const ticketLabels = ["Quantity", "Grouping", "Details"]
    const auctionStates = ["auctionStartTotalPrice", "auctionStartDate", "auctionStartTime", "auctionEndTotalPrice", "auctionEndDate", "auctionEndTime", "auctionOverview", "auctionDetails"]
    const auctionLabels = ["Total Price", "Start Date", "Start Time", "Total Price", "End Date", "End Time", "Overview", "Details"]
    
    const inputs = (states, labels, index = -1) => states.map((state) => {
        index++;
        return <div>
                <label htmlFor={state}> {labels[index]}: </label>
                <input
                  name={state}
                  onChange={this.onInputChange}
                  value={this.state.name}
                />
              </div>;
    })

    return (
      <section>
        <form onSubmit={this.onSubmitTicket}>
          {inputs(eventStates, eventLabels)}
          {inputs(ticketStates, ticketLabels)}
          {inputs(auctionStates, auctionLabels)}
        </form>

        <Ticket ticket={this.state.newTicket} example={true}/>
      </section>
    )
  }
}

export default NewTicket;
