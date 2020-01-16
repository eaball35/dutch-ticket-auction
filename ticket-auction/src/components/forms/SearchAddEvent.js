import React, { Component } from 'react';
import '../../css/NewTicketForm.css';

class SearchAddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventTitle: "",
      eventPerformer: "",
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
      eventTitle: this.state.eventTitle,
      eventPerformer: this.state.eventPerformer,
    })
    this.setState({
      eventTitle: "",
      eventPerformer: "",
    })
  }
  
  render() {
    return (
      <section className="venue-search">
        <h2>Step 2: Search to Add Event</h2>
        <p>Enter title <strong>and/or</strong> performer, click search, and select event.</p>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="eventTitle"> Event Title: </label>
            <input
              name="eventTitle"
              onChange={this.onInputChange}
              value={this.state.eventTitle}
            />
          </div>
          <div>
            <label htmlFor="eventPerformer"> Event Performer: </label>
            <input
              name="eventPerformer"
              onChange={this.onInputChange}
              value={this.state.eventPerformer}
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
