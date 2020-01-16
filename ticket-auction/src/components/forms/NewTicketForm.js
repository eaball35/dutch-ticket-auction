import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../../css/NewTicketForm.css';
import NewTicketFormEvent from './NewTicketFormEvent';
import NewTicketFormVenue from './NewTicketFormVenue';
import NewTicketFormAuction from './NewTicketFormAuction';
import SPRING_SECURITY from '../../config_spring_keys.js'
const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class NewTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: undefined,
      showEventForm: false,
      
      venue: undefined,
      showVenueForm: true,
      
      auctionStart: "",
      auctionEnd: "",
      startTotalPrice: "",
      endTotalPrice: "",
      auctionDetails: "",
      overview: "",
      showAuctionForm: false,
      redirect: undefined,
    };
  }
  
  updateShowForm = (form) => {
    if(form === "venue") {
      this.setState({showVenueForm: !this.state.showVenueForm})
    } else if (form === "event") {
      this.setState({showEventForm: !this.state.showEventForm})
    } else if (form === "auction") {
      this.setState({showAuctionForm: !this.state.showAuctionForm})
    }
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
      overview: this.state.overview,
    }

    axios.post(url, data, headers)
      .then((response) => {
        this.setState({redirect: `/tickets/${response.data.id}`})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  submitVenue = (inputVenue) => {
    this.setState({venue: inputVenue})
  }

  submitEvent = (inputEvent) => {
    console.log("I got here" + inputEvent)
    this.setState({event: inputEvent})
  }

  showTicketForms = () => {
    if (this.state.showVenueForm) {
      return <NewTicketFormVenue updateShowForm={this.updateShowForm} submitVenue={this.submitVenue}/>
    } else if (this.state.showEventForm) {
      return <NewTicketFormEvent updateShowForm={this.updateShowForm} submitEvent={this.submitEvent}/>
    } else if (this.state.showAuctionForm) {
      return (
        <div>
          <NewTicketFormAuction updateShowForm={this.updateShowForm} onInputChange={this.onInputChange}/>
          <form onSubmit={this.onSubmitTicket}>
            <div>
              <input type="submit" value="Submit New Ticket" className="btn btn-success"/>
            </div>
          </form>  
        </div>
      )
    } else {
      return null;
    }
  }

  placeClassName = (tab) => {
    if (tab === "venue" && this.state.showVenueForm) {
      return "new-ticket-place active"
    } else if (tab === "event" && this.state.showEventForm) {
      return "new-ticket-place active"
    } else if (tab === "auction" && this.state.showAuctionForm) {
      return "new-ticket-place active"
    } else {
      return "new-ticket-place"
    }
  }

  
  render() {
    const { redirect  } = this.state;
    if (redirect !== undefined) {
      return <Redirect to={redirect}/>;
    }
    return (
      <section className="new-ticket-container">
        <h1>3 Easy Steps to Start Selling on TicketClock</h1>
        <div className="new-ticket-place-container">
          <span className={this.placeClassName("venue")}>1</span>
          <span className={this.placeClassName("event")}>2</span>
          <span className={this.placeClassName("auction")}>3</span>
        </div>
        {this.showTicketForms()}
      </section>
    )
  }
}

export default NewTicket;
