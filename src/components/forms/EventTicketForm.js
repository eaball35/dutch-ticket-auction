import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../../css/NewTicketForm.css';
import SPRING_SECURITY from '../../config_spring_keys.js'
import NewTicketFormEvent from './NewTicketFormEvent';
import SearchAddEvent from './SearchAddEvent';
import NewTicketFormAuction from './NewTicketFormAuction';
const base_url = `${SPRING_SECURITY.base_url}`
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`
var dateFormat = require('dateformat');

class EventTicketForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: undefined,
      
      
      auctionStart: new Date(),
      auctionEnd: new Date(),
      startTotalPrice: "",
      endTotalPrice: "",
      auctionDetails: "",
      ticketQuantity: "",
      ticketGrouping: "",
      pitch: "",
      
      collection: [],
      redirect: undefined,
    };
  }

  onStartChange = auctionStart => this.setState({ auctionStart })
  onEndChange = auctionEnd => this.setState({ auctionEnd })

  componentDidMount = () => {
    if (this.props.event) {
      this.setState({event: this.props.event})
    }
  }

  updateAuctionDetails = (dates) => {
    this.setState({
      startTotalPrice: dates.startDate,
      endTotalPrice: dates.endDate
    })
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
    const url = `${base_url}/tickets`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    const data = {
      user: this.props.currentUser,
      event: this.state.event,


      auctionStart: this.state.auctionStart,
      auctionEnd: this.state.auctionEnd,
      startTotalPrice: this.state.startTotalPrice,
      endTotalPrice: this.state.endTotalPrice,
      auctionDetails: this.state.auctionDetails,
      ticketQuantity: this.state.ticketQuantity,
      ticketGrouping: this.state.ticketGrouping,
      pitch: this.state.pitch,
    }

    axios.post(url, data, headers)
      .then((response) => {
        this.setState({redirect: `/tickets/${response.data.id}`})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  submitEvent = (inputEvent) => {
    this.setState({event: inputEvent})
  }

  onSearch = (query) => {
    const url = `${base_url}/search?q=${query}`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    
    axios.get(url, headers)
      .then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  showSelectedEvent = () => {
    if (this.state.event) {
      return (
        <section>
          <h2>Selected Event:</h2>
          <section className="selected-venue-details">
            <h4>{this.state.event.title} - {this.state.event.venue.address.city.name}, {this.state.event.venue.address.city.state}</h4>
            <p>{this.state.event.description}</p>
            <p>{dateFormat(this.state.event.start, "mmm dS, yyyy, h:MM TT")}</p>
          </section>

          <form onSubmit={this.onSubmitTicket}>
            <NewTicketFormAuction onStartChange={this.onStartChange} onEndChange={this.onEndChange} endDate={this.state.auctionEnd} startDate={this.state.auctionStart} onInputChange={this.onInputChange} ticketGrouping={this.state.ticketGrouping}/>
            <div className="venue-btn-container">
              <input type="submit" value="Submit Ticket" className="btn btn-primary"/>
            </div>
          </form>
        </section>
      )
    }
  }

  addSelectedEvent = (event) => {
    this.setState({event})
  }


  bottomDisplay = () => {
    let results;
    if (this.state.collection.length > 0) {
      results = this.state.collection.map((event, i) => {
        return (
          <div key={i} className="search-results">
            <button onClick={() => this.addSelectedEvent(event)} className="btn btn-secondary">+</button>
            <div className='search-event-details'>
              <p>{dateFormat(event.start, "mmm dS, yyyy, h:MM TT")}</p>
              <p><strong>{event.title}</strong> 
                { (event.venue.address)
                  ?(event.venue.address.city.name, event.venue.address.city.state)
                  : ""
                }
              </p>
              <p>@{event.venue.title}</p> 
            </div>
          </div>
          
        )
      })
      results = (
        <section className="search-results-container">
          <h4> Event Search Results <small>(click '+' to select)</small></h4>
          {results}
        </section>
        )
    }
    return results;
  }
  
  render() {
    const { redirect  } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }
    return (
      <section className="new-event-ticket-container">
        <div className="left-event-sect">
          <h1>Quick List on TicketClock</h1>
          <SearchAddEvent onSearch={this.onSearch}/>
          {this.bottomDisplay()}
        </div>
        <div className="right-event-sect">
          {this.showSelectedEvent()}
        </div>
      </section>
    )
  }
}

export default EventTicketForm;
