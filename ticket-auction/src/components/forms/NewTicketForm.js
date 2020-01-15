import React, { Component } from 'react';
import Ticket from '../listings/Ticket'
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import '../../css/NewTicketForm.css';
import NewTicketFormEvent from './NewTicketFormEvent';
import NewTicketFormVenue from './NewTicketFormVenue';
import NewTicketFormAuction from './NewTicketFormAuction';

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
      eventCategoryTypes: [],
      eventCategoryGenres: [],
      showEventForm: false,
      
      
      venue: "",
      showVenueForm: true,
      
      
      auctionStart: "",
      auctionEnd: "",
      startTotalPrice: "",
      endTotalPrice: "",
      auctionDetails: "",
      overview: "",
      showAuctionForm: false
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


  lookupVenue = (title) => {
    
  }

  submitVenue = (inputVenue) => {
    
  }

  showTicketForms = () => {
    if (this.state.showVenueForm) {
      return <NewTicketFormVenue updateShowForm={this.updateShowForm} submitVenue={this.submitVenue}/>
    } else if (this.state.showEventForm) {
      return <NewTicketFormEvent updateShowForm={this.updateShowForm}/>
    } else if (this.state.showAuctionForm) {
      return (
        <div>
          <NewTicketFormAuction updateShowForm={this.updateShowForm}/>
          <form onSubmit={this.onSubmitTicket}>
            <div>
              <input type="submit" value="Submit New Ticket"/>
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
