import React, { Component } from 'react';
import '../../css/NewTicketForm.css';
import SearchAddVenue from './SearchAddVenue';
import axios from 'axios';
import SPRING_SECURITY from '../../config_spring_keys.js'
const base_url = 'http://ticketclock.us-west-2.elasticbeanstalk.com'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class NewTicketFormVenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venueTitle: "",
      venueDescription: "",
      venueDetails: "",
      venueAddress1: "",
      venueAddress2: "",
      venueCity: "",
      venueState: "",
      venueZipCode: "",
      collection: [],
      addNewVenue: false,
      selectedVenue: undefined,
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
    this.props.submitVenue(this.state.selectedVenue);
    
    this.props.updateShowForm("venue");
    this.props.updateShowForm("event");
  }

  onSearch = (query) => {
    const url = `${base_url}/findVenue?title=${query.venueTitle}&zipCode=${query.venueZipCode}`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    
    axios.get(url, headers)
      .then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  addSelectedVenue = (venue) => {
    this.setState({
      selectedVenue: venue,
    })
  }

  addNewVenue = () => {
    this.setState({addNewVenue: !this.state.addNewVenue})
  }

  createNewVenue = (event) => {
    event.preventDefault();
    const url = `${base_url}/venues`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    
    // should get city & lookup or create address -> Then post the data with correct objs
    const data = {
      "title": this.state.venueTitle,
      "description": this.state.venueDescription,
      "details": this.state.venueDetails,
      "address": {
        "address1": this.state.venueAddress1,
        "address2": this.state.venueAddress2,
        "city": {
          "name": this.state.venueCity,
          "state": this.state.venueState,
        },
        "zipCode": this.state.venueZipCode,
      }
    }
    
    axios.post(url, data, headers)
      .then((response) => {
        this.setState({selectedVenue: response.data})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }


  bottomDisplay = () => {
    let results;
    if (this.state.collection.length > 0) {
      results = this.state.collection.map((venue, i) => {
        return (
          <div key={i} className="search-results">
            <button onClick={() => this.addSelectedVenue(venue)} className="btn btn-secondary">+</button>
            <div>
              <p><strong>{venue.title}</strong> ({venue.address.city.name}, {venue.address.city.state})</p>
              <p> </p>
            </div>
          </div>
        )
      })
      results = (
        <section className="search-results-container">
          <h4> Venue Search Results <small>(click '+' to select)</small></h4>
          {results}
        </section>
        )
    } else {
        results = (
          <div>
            <p className="center-or">OR</p>
            <div className="add-btns">
              <button className="btn btn-secondary" onClick={this.addNewVenue}>Add New Venue</button>
            </div>
          </div>
        )
    }
    return results;
  }


  showSelectedVenue = () => {
    if (this.state.selectedVenue) {
      return (
        <section>
          <h2>Selected Event Venue:</h2>
          <p>Click 'next' to continue with selected.</p>
          <section className="selected-venue-details">
            <h4>{this.state.selectedVenue.title} - {this.state.selectedVenue.address.city.name}, {this.state.selectedVenue.address.city.state}</h4>
            <p>{this.state.selectedVenue.description}</p>
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
    const venueStates = ["venueTitle", "venueDescription", "venueDetails", "venueAddress1", "venueAddress2", "venueCity", "venueState", "venueZipCode"]
    const venueLabels = ["Title", "Description", "Details", "Address 1", "Address 2", "City", "State", "Zip Code"]
    const stateInputs = [ " ", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "MD", "MA", "MI", "MN", "MS", "MO", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", ]

    const inputOptions = (list) => list.map((item, i) => {
      return <option value={item} key={i}>{item}</option>
    });
    
    const inputs = (states, labels, index = -1) => states.map((state) => {
        index++;
        if (state === "venueState") {
          return( 
            <div>
              <label htmlFor={state}> {labels[index]}: </label>
              <select name={state} onChange={this.onInputChange} value={this.state[state]}>
                {inputOptions(stateInputs)}
              </select>
            </div>)
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
          )}
    })


    const displaySection = () => {
      if(this.state.addNewVenue) {
        return (
          <section className="venue-form-details">
            <h2>Event Venue Details</h2>
            <form onSubmit={this.createNewVenue}>
              {inputs(venueStates, venueLabels)}
              <div>
                <input type="submit" value="Add New Venue" className="btn btn-primary"/>
              </div>
            </form>
            
        </section>
        )
      } else {
        return (
          <section>
            <SearchAddVenue onSearch={this.onSearch}/>
            {this.bottomDisplay()}
          </section>
        )
      }
    }

    return (
      <section className="new-ticket-venue-container">
        {displaySection()}
        {this.showSelectedVenue()}      
      </section>
    )
  }
}

export default NewTicketFormVenue;
