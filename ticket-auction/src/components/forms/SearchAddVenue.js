import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import SPRING_SECURITY from '../../config_spring_keys.js'
import '../../css/NewTicketForm.css';


const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class SearchAddVenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venueZipCode: "",
      venueTitle: "",
    };
  }
  
  onInputChange = (event) => {
    const updatedState = {};
    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;  
    this.setState(updatedState);
  }

  fetchUserByEmail = (email) => {
    const url = `${base_url}/users/email/${email}`
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    }
    
    axios.get( url, headers).then((response) => {
        this.setState({currentUser: response.data})
      })
      .catch((error) => {
        this.setState({error})
      });
  }
  
  
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch({
      venueZipCode: this.state.venueZipCode,
      venueTitle: this.state.venueTitle,
    })
    this.setState({
      venueZipCode: "",
      venueTitle: "",
    })
  }
  
  render() {
    return (
      <section className="venue-search">
        <h2>Step 1: Search to Add Event Venue</h2>
        <p>Enter title <strong>and/or</strong> zip code, click search, and select venue.</p>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="venueTitle"> Venue Title: </label>
            <input
              name="venueTitle"
              onChange={this.onInputChange}
              value={this.state.venueTitle}
            />
          </div>
          <div>
            <label htmlFor="venueZipCode"> Venue Zip Code: </label>
            <input
              name="venueZipCode"
              onChange={this.onInputChange}
              value={this.state.venueZipCode}
            />
          </div>
          <div className="add-btns">
            <input type="submit" value="Search" className="btn btn-success search"/>
          </div>
      </form>
    </section>
    )
  }
}

export default SearchAddVenue;
