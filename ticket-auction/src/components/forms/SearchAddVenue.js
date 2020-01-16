import React, { Component } from 'react';
import '../../css/NewTicketForm.css';

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
        <h2>Step 1: Search to Add Venue</h2>
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
