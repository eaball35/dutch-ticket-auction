import React, { Component } from 'react';
import Ticket from '../listings/Ticket'
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';

class NewTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdAt: this.props.exampleTicket.createdAt,
      userId: this.props.currentUserId,
      
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
      
      auctionStartTotalPrice: this.props.exampleTicket.auctionStartTotalPrice,
      auctionStart: this.props.exampleTicket.auctionStart,
      auctionEndTotalPrice: this.props.exampleTicket.auctionEndTotalPrice,
      auctionEnd: this.props.exampleTicket.auctionEnd,
      auctionOverview: this.props.exampleTicket.auctionOverview,
      auctionDetails: this.props.exampleTicket.auctionDetails,

      newTicket: this.props.exampleTicket,
    };
  }
  
  onInputChange = (event) => {
    const updatedState = {};
    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.newTicket[field] = value;
    updatedState['newTicket'] = this.state.newTicket;
    
    this.setState(updatedState);
  }

  onSubmitTicket = (event) => {
    event.preventDefault();
    const params = {
      "userId": this.state.userId,
      "artist": this.state.artist,
      "event": this.state.event,
      "eventImgUrls": this.state.eventImgUrls,
      "eventLocation": this.state.eventLocation,
      "eventCity": this.state.eventCity,
      "eventState": this.state.eventState,
      "eventStart": this.state.eventStart,
      "eventEnd": this.state.eventEnd,
      "eventDetails": this.state.eventDetails,
      "ticketQuantity": this.state.ticketQuantity,
      "ticketGrouping": this.state.ticketGrouping,
      "ticketDetails": this.state.ticketDetails,
      "auctionStartTotalPrice": this.state.auctionStartTotalPrice,
      "auctionStart": this.state.auctionStart,
      "auctionEndTotalPrice": this.state.auctionEndTotalPrice,
      "auctionEnd": this.state.auctionEnd,
      "auctionOverview": this.state.auctionOverview,
      "auctionDetails": this.state.auctionDetails
    }

    axios.post(`http://localhost:8080/tickets`, params)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  tabClick = () => {

  }
  
  render() {
    const eventStates = ["artist", "event", "eventLocation", "eventCity", "eventState", "eventStart", "eventEnd", "eventDetails"]
    const eventLabels = ["Artist", "Event", "Location", "City", "State", "Event Start", "Event End", "Event Details"]
    const ticketStates = ["ticketQuantity", "ticketGrouping", "ticketDetails"]
    const ticketLabels = ["Quantity", "Grouping", "Details"]
    const auctionStates = ["auctionStartTotalPrice", "auctionEndTotalPrice", "auctionStart", "auctionEnd", "auctionOverview", "auctionDetails"]
    const auctionLabels = ["Start Total Price", "End Total Price", "Auction Start", "Auction End", "Auction Overview", "Auction Details"]

    
    const inputs = (states, labels, index = -1) => states.map((state) => {
        index++;
        if (state === "ticketGrouping") {
          return( 
          <div>
            <label htmlFor={state}> {labels[index]}: </label>
            <select name={state} onChange={this.onInputChange}value={this.state.emoji}>
              {inputOptions(["together", "general admission"])}
            </select>
          </div>)
        } else if (state === "eventState") {
          return( 
            <div>
              <label htmlFor={state}> {labels[index]}: </label>
              <select name={state} onChange={this.onInputChange}value={this.state.emoji}>
                {inputOptions([
                  " ", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "MD", "MA", "MI", "MN", "MS", "MO", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", ])}
              </select>
            </div>)
        } else if (state === "eventStart" || state === "eventEnd" || state === "auctionStart" || state === "auctionEnd") {
          return (
              <div>
                <label htmlFor={state}> {labels[index]}: </label>
                <DateTimePicker
                  name={state}
                  onChange={this.onInputChange}
                  value={this.state.name}
                />
              </div>
          )} else {
          return (
            <div>
              <label htmlFor={state}> {labels[index]}: </label>
              <input
                name={state}
                onChange={this.onInputChange}
                value={this.state.name}
              />
            </div>
          )}
    })

    const inputOptions = (list) => list.map((item, i) => {
      return <option value={item} key={i}>{item}</option>
    });
  

    return (
      <section>
        <form onSubmit={this.onSubmitTicket}>
        
          <button onClick={() => {this.tabClick('event')}}>Event</button>
          {inputs(eventStates, eventLabels)}
          
          <button onClick={() => {this.tabClick('ticket')}}>Ticket</button>
          {inputs(ticketStates, ticketLabels)}
          
          <button onClick={() => {this.tabClick('auction')}}>Auction</button>
          {inputs(auctionStates, auctionLabels)}
        
          <div>
            <input type="submit" value="Submit"/>
          </div>
        </form>      

        <Ticket ticket={this.state.newTicket} example={true}/>
      </section>
    )
  }
}

export default NewTicket;
