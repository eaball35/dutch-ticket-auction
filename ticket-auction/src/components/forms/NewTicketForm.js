import React, { Component } from 'react';
import Ticket from '../listings/Ticket'
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import '../../css/NewTicketForm.css';

class NewTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventTitle: "",
      eventDescription: "",
      eventStart: "",
      eventEnd: "",
      performer: "",
      eventAllDay: "",
      performerImgUrls: [],
      eventImgUrls: [],
      ventCategoryTypes: [],
      eventCategoryGenres: [],
      
      
      venueTitle: "",
      venueDescription: "",
      venueDetails: "",
      venueAddress1: "",
      venueAddress2: "",
      venueCity: "",
      venueState: "",
      venueZipCode: "",
      
      
      auctionStart: "",
      auctionEnd: "",
      startTotalPrice: "",
      endTotalPrice: "",
      auctionDetails: "",
      overview: "",
    };
  }
  
  onInputChange = (event) => {
    const updatedState = {};
    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  }

  onSubmitTicket = (event) => {
    event.preventDefault();
    const params = {
      
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
      <section className="new-ticket-container">
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
