import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import '../../css/NewTicketForm.css';

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
      performerImgUrls: [],
      eventImgUrls: [],
      eventCategoryTypes: [],
      eventCategoryGenres: [],
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
    const inputEvent = {
      eventTitle: this.state.eventTitle,
      eventDescription: this.state.eventDescription,
      eventStart: this.state.eventStart,
      eventEnd: this.state.eventEnd,
      performer: this.state.performer,
      eventAllDay: this.state.eventAllDay,
      performerImgUrls: this.state.performerImgUrls,
      eventImgUrls: this.state.eventImgUrls,
      eventCategoryTypes: this.state.eventCategoryTypes,
      eventCategoryGenres: this.state.eventCategoryGenres,
    }
    
    
    this.props.submitEvent(inputEvent);
    this.props.updateShowForm("event");
    this.props.updateShowForm("auction");
  }
  
  render() {
    const eventStates = ["eventTitle", "eventDescription", "eventAllDay", "eventStart", "eventEnd", "performer", "eventCategoryTypes", "eventCategoryGenres", "eventImgUrls", "performerImgUrls"]
    const eventLabels = ["Title", "Description", "All Day?", "Start", "End", "Performer", "Category Type", "Category Genre", "Event Images", "Performer Images"]

    
    const inputs = (states, labels, index = -1) => states.map((state) => {
        index++;
          if (state === "eventStart" || state === "eventEnd") {
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

    return (
      <section className="new-ticket-event-container">
        <form onSubmit={this.onSubmit}>
          {inputs(eventStates, eventLabels)}
          <div>
            <input type="submit" value="Next >"/>
          </div>
        </form>      
      </section>
    )
  }
}

export default NewTicketFormEvent;
