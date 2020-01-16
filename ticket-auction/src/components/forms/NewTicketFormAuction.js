import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import '../../css/NewTicketForm.css';

class NewTicketFormAuction extends Component {
  render() {
    const auctionStates = ["auctionStart", "auctionEnd", "startTotalPrice", "endTotalPrice", "auctionDetails", "overview"]
    const auctionLabels = ["Start", "End", "Start Total Price", "End Total Price", "Details", "Overview"]

    
    const inputs = (states, labels, index = -1) => states.map((state) => {
        index++;
          if (state === "auctionStart" || state === "auctionEnd") {
          return (
              <div>
                <label htmlFor={state}> {labels[index]}: </label>
                <DateTimePicker
                  name={state}
                />
              </div>
          )} else {
          return (
            <div>
              <label htmlFor={state}> {labels[index]}: </label>
              <input
                name={state}
                onChange={this.props.onInputChange}
              />
            </div>
          )}
    })

    return (
      <section className="new-ticket-auction-container">
        <form onSubmit={this.onSubmit}>
          {inputs(auctionStates, auctionLabels)}
        </form>      
      </section>
    )
  }
}

export default NewTicketFormAuction;
