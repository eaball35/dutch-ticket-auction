import React, { Component } from 'react';
import '../../css/NewTicketForm.css';

class SearchAddCity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: "",
      cityState: "",
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
      cityName: this.state.cityName,
      cityState: this.state.cityState,
    })
    this.setState({
      cityName: "",
      cityState: "",
    })
  }
  
  render() {
    return (
      <section className="venue-search">
        <h2>Step 1: Search to Add City</h2>
        <p>Enter city <strong>and/or</strong> state, click search, and select city.</p>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="cityName"> City: </label>
            <input
              name="cityName"
              onChange={this.onInputChange}
              value={this.state.cityName}
            />
          </div>
          <div>
            <label htmlFor="cityState"> State: </label>
            <input
              name="cityState"
              onChange={this.onInputChange}
              value={this.state.cityState}
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

export default SearchAddCity;
