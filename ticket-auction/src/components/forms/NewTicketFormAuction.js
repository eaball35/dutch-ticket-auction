import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import '../../css/NewTicketForm.css';

class NewTicketFormAuction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auctionStart: "",
      auctionEnd: "",
      startTotalPrice: "",
      endTotalPrice: "",
      auctionDetails: "",
      overview: "",
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

  tabClick = () => {

  }
 
  
  
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
      <section className="new-ticket-auction-container">
        <form onSubmit={this.onSubmit}>
          {inputs(auctionStates, auctionLabels)}
        </form>      
      </section>
    )
  }
}

export default NewTicketFormAuction;
