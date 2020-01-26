import React, { Component } from 'react';
import '../../css/NewTicketForm.css';

class SearchAddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
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
    this.props.onSearch(this.state.query)
    this.setState({
      query: "",
    })
  }
  
  render() {
    return (
      <section className="venue-search">
        <h2>Search to Add Event</h2>
        <p>Search events and select your ticket listing event.</p>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="query"> Query: </label>
            <input
              name="query"
              onChange={this.onInputChange}
              value={this.state.query}
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

export default SearchAddEvent;
