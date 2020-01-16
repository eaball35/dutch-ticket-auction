import React, { Component } from 'react';
import '../../css/NewTicketForm.css';
import SearchAddEvent from './SearchAddEvent';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import SPRING_SECURITY from '../../config_spring_keys.js'
const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`
var dateFormat = require('dateformat');

class NewTicketFormEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventTitle: "",
      eventDescription: "",
      eventStart: "",
      eventEnd: "",
      performer: "",
      eventAllDay: "",
      eventDetails: "",
      performerImgUrls: [],
      eventImgUrls: [],
      eventCategoryTypes: [],
      eventCategoryGenres: [],
      collection: [],
      addNewEvent: false,
      selectedEvent: undefined,
    };
  }
  
  onInputChange = (event) => {
    const updatedState = {};
    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.submitEvent(this.state.selectedEvent);
    
    this.props.updateShowForm("event");
    this.props.updateShowForm("auction");
  }

  onSearch = (query) => {
    const url = `${base_url}/findEvent?title=${query.eventTitle}&performer=${query.eventPerformer}`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    
    axios.get(url, headers)
      .then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  addSelectedEvent = (event) => {
    this.setState({
      selectedEvent: event,
    })
  }

  addNewEvent = () => {
    this.setState({addNewEvent: !this.state.addNewEvent})
  }

  createNewEvent = (event) => {
    event.preventDefault();
    const url = `${base_url}/events`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    
    // should lookup categories & performer first -> then post data
    const data = {
      "categories": [],
      "venue": this.props.selectedVenue,
      "eventfulId": "",
      "title": this.state.eventTitle,
      "performer": [],
      "description": this.state.eventDescription,
      "start": this.state.eventStart,
      "end": this.state.eventEnd,
      "imageUrls": [],
      "allDay": this.state.allDay,
      "eventDetails": this.state.eventDetails
    }

    axios.post(url, data, headers)
      .then((response) => {
        this.setState({selectedEvent: response.data})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }


  bottomDisplay = () => {
    let results;
    if (this.state.collection.length > 0) {
      results = this.state.collection.map((event, i) => {
        return (
          <div key={i} className="search-results">
            <button onClick={() => this.addSelectedEvent(event)} className="btn btn-secondary">+</button>
            <div className='search-event-details'>
              <p><strong>{event.title}</strong> ({event.venue.address.city.name}, {event.venue.address.city.state})</p>
              <p>{event.performer[0].name} </p>
              <p>{dateFormat(event.start, "mmm dS, yyyy, h:MM TT")}</p>
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
    } else {
        results = (
          <div>
            <p className="center-or">OR</p>
            <div className="add-btns">
              <button className="btn btn-secondary" onClick={this.addNewEvent}>Add New Event</button>
            </div>
          </div>
        )
    }
    return results;
  }


  showSelectedEvent = () => {
    if (this.state.selectedEvent) {
      return (
        <section>
          <h2>Selected Event:</h2>
          <p>Click 'next' to continue with selected.</p>
          <section className="selected-venue-details">
            <h4>{this.state.selectedEvent.title} - {this.state.selectedEvent.venue.address.city.name}, {this.state.selectedEvent.venue.address.city.state}</h4>
            <p>{this.state.selectedEvent.description}</p>
            <p>{dateFormat(this.state.selectedEvent.start, "mmm dS, yyyy, h:MM TT")}</p>
          </section>

          <form onSubmit={this.onSubmit}>
            <div className="venue-btn-container">
              <input type="submit" value="Next >" className="btn btn-primary"/>
            </div>
          </form>
        </section>
      )
    }
  }
  
  render() {
    const eventStates = ["eventTitle", "eventDescription", "eventAllDay", "eventStart", "eventEnd", "performer", "eventDetails", "eventCategoryTypes", "eventCategoryGenres", "eventImgUrls", "performerImgUrls"]
    const eventLabels = ["Title", "Description", "All Day?", "Start", "End", "Performer", "Event Details", "Category Type", "Category Genre", "Event Images", "Performer Images"]

    
    const inputs = (states, labels, index = -1) => states.map((state) => {
        index++;
        if (state === "eventStart" || state === "eventEnd") {
          return (
              <div>
                <label htmlFor={state}> {labels[index]}: </label>
                <DateTimePicker
                  name={state}
                  onChange={this.onInputChange}
                  value={this.state[state]}
                />
              </div>
          )
        } else {
            return (
              <div>
                <label htmlFor={state}> {labels[index]}: </label>
                <input
                  name={state}
                  onChange={this.onInputChange}
                  value={this.state[state]}
                />
              </div>
            )
        }
    })


    const displaySection = () => {
      if(this.state.addNewEvent) {
        return (
          <section className="venue-form-details">
            <h2>Event Details</h2>
            <form onSubmit={this.createNewVenue}>
              {inputs(eventStates, eventLabels)}
              <div>
                <input type="submit" value="Add New Event" className="btn btn-primary"/>
              </div>
            </form>
          </section>
        )
      } else {
        return (
          <section>
            <SearchAddEvent onSearch={this.onSearch}/>
            {this.bottomDisplay()}
          </section>
        )
      }
    }

    return (
      <section className="new-ticket-venue-container">
        {displaySection()}
        {this.showSelectedEvent()}      
      </section>
    )
  }
}

export default NewTicketFormEvent;
