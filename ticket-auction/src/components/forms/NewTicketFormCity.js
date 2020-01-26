import React, { Component } from 'react';
import '../../css/NewTicketForm.css';
import SearchAddCity from './SearchAddCity';
import axios from 'axios';
import SPRING_SECURITY from '../../config_spring_keys.js'
const base_url = `${SPRING_SECURITY.base_url}`
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class NewTicketFormCity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: "",
      cityState: "",
      collection: [],
      addNewCity: false,
      selectedCity: undefined,
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
    this.props.submitCity(this.state.selectedCity);
    
    this.props.updateShowForm("city");
    this.props.updateShowForm("venue");
  }

  onSearch = (query) => {
    const url = `${base_url}/findCity?name=${query.cityName}&state=${query.cityState}`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    
    axios.get(url, headers)
      .then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  addSelectedCity = (city) => {
    this.setState({
      selectedCity: city,
    })
  }

  addNewCity = () => {
    this.setState({addNewCity: !this.state.addNewCity})
  }

  createNewCity = (event) => {
    event.preventDefault();
    const url = `${base_url}/cities`
    const headers = { headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) }}
    
    const data = {
      "name": this.state.cityName,
      "state": this.state.cityState,
    }

    axios.post(url, data, headers)
      .then((response) => {
        this.setState({selectedCity: response.data})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }


  bottomDisplay = () => {
    let results;
    if (this.state.collection.length > 0) {
      results = this.state.collection.map((city, i) => {
        return (
          <div key={i} className="search-results">
            <button onClick={() => this.addSelectedCity(city)} className="btn btn-secondary">+</button>
            <div className='search-event-details'>
              <p>{city.name}, {city.state}</p>
            </div>
          </div>
          
        )
      })
      results = (
        <section className="search-results-container">
          <h4> City Search Results <small>(click '+' to select)</small></h4>
          {results}
        </section>
        )
    } else {
        results = (
          <div>
            <p className="center-or">OR</p>
            <div className="add-btns">
              <button className="btn btn-secondary" onClick={this.addNewCity}>Add New City</button>
            </div>
          </div>
        )
    }
    return results;
  }


  showSelectedCity = () => {
    if (this.state.selectedCity) {
      return (
        <section>
          <h2>Selected City:</h2>
          <p>Click 'next' to continue with selected.</p>
          <section className="selected-venue-details">
            <h4>{this.state.selectedCity.name}, {this.state.selectedCity.state} </h4>
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
    const cityStates = ["cityName", "cityState"]
    const cityLabels = ["City", "State"]
    const stateInputs = [ " ", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "MD", "MA", "MI", "MN", "MS", "MO", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", ]

    const inputOptions = (list) => list.map((item, i) => {
      return <option value={item} key={i}>{item}</option>
    });
    
    const inputs = (states, labels, index = -1) => states.map((state) => {
        index++;
        if (state === "cityState") {
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
            )
        }
    })


    const displaySection = () => {
      if (this.state.addNewCity) {
        return (
          <section className="venue-form-details">
            <h2>City Details</h2>
            <form onSubmit={this.createNewCity}>
              {inputs(cityStates, cityLabels)}
              <div>
                <input type="submit" value="Add New City" className="btn btn-primary"/>
              </div>
            </form>
          </section>
        )
      } else {
        return (
          <section>
            <SearchAddCity onSearch={this.onSearch}/>
            {this.bottomDisplay()}
          </section>
        )
      }
    }

    return (
      <section className="new-ticket-venue-container">
        {displaySection()}
        {this.showSelectedCity()}
      </section>
    )
  }
}

export default NewTicketFormCity;
