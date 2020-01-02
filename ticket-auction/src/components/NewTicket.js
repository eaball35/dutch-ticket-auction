import React, { Component } from 'react';
import Ticket from './Ticket'

class NewTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdAt: this.props.exampleTicket.createdAt,
      userId: this.props.exampleTicket.userId,
      
      artist: this.props.exampleTicket.artist,
      event: this.props.exampleTicket.event,
      eventImgUrls: this.props.exampleTicket.eventImgUrls,
      eventLocation: this.props.exampleTicket.eventLocation,
      eventCity: this.props.exampleTicket.eventCity,
      eventState: this.props.exampleTicket.eventState,
      eventStart: this.props.exampleTicket.eventStart,
      eventEnd: this.props.exampleTicket.eventEnd,
      eventDetails: this.props.exampleTicket.eventDetails,
      
      ticketQuantity: this.props.exampleTicket.ticketQuantity,
      ticketGrouping: this.props.exampleTicket.ticketGrouping,
      ticketDetails: this.props.exampleTicket.ticketDetails,
      
      auctionStartTotalPrice: this.props.exampleTicket.AuctionStartTotalPrice,
      auctionStart: this.props.exampleTicket.auctionStart,
      auctionEndTotalPrice: this.props.exampleTicket.auctionEndTotalPrice,
      auctionEnd: this.props.exampleTicket.auctionEnd,
      auctionOverview: this.props.exampleTicket.auctionOverview,
      auctionDetails: this.props.exampleTicket.auctionDetails,

      newTicket: this.props.exampleTicket,
    };
  }

  updateNewTicket = () => {
    const newTicket = {
      createdAt: this.state.exampleTicket.createdAt,
      userId: this.state.exampleTicket.userId,
      
      artist: this.state.exampleTicket.artist,
      event: this.state.exampleTicket.event,
      eventImgUrls: this.state.exampleTicket.eventImgUrls,
      eventLocation: this.state.exampleTicket.eventLocation,
      eventCity: this.state.exampleTicket.eventCity,
      eventState: this.state.exampleTicket.eventState,
      eventStart: this.state.exampleTicket.eventStart,
      eventEnd: this.state.exampleTicket.eventEnd,
      eventDetails: this.state.exampleTicket.eventDetails,
      
      ticketQuantity: this.state.exampleTicket.ticketQuantity,
      ticketGrouping: this.state.exampleTicket.ticketGrouping,
      ticketDetails: this.state.exampleTicket.ticketDetails,
      
      auctionStartTotalPrice: this.state.exampleTicket.AuctionStartTotalPrice,
      auctionStart: this.state.exampleTicket.auctionStart,
      auctionEndTotalPrice: this.state.exampleTicket.auctionEndTotalPrice,
      auctionEnd: this.state.exampleTicket.auctionEnd,
      auctionOverview: this.state.exampleTicket.auctionOverview,
      auctionDetails: this.state.exampleTicket.auctionDetails,
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

  tabClick = () => {

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
        
          <button onClick={() => {this.tabClick('event')}}>Event</button>
          {inputs(eventStates, eventLabels)}
          
          <button onClick={() => {this.tabClick('ticket')}}>Ticket</button>
          {inputs(ticketStates, ticketLabels)}
          
          <button onClick={() => {this.tabClick('auction')}}>Auction</button>
          {inputs(auctionStates, auctionLabels)}
        </form>      

        <Ticket ticket={this.state.newTicket} example={true}/>
      </section>
    )
  }
}

export default NewTicket;
