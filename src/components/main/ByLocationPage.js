import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import Map from './Map.js';
import GMap from './GoogleMap.js';
import TopCities from './TopCities';
import List from './List';
import axios from 'axios';
import '../../css/ByLocationPage.css'

import SPRING_SECURITY from '../../config_spring_keys.js'

const base_url = `${SPRING_SECURITY.base_url}`
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`


class ByLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
      selectedState: "WA",
      topCity: {name: "Seattle", state: "WA"},
      selectedVenue: undefined,
      collection: undefined,
      zoom: 10,
    };
  }

  fetchCollection(url, headers) {
    axios.get( url, headers).then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        console.log("No collection")
        // this.setState({errors: error})
      });
  }

  setSelectedVenue = (venue) => {
    this.setState({selectedVenue: venue})
  }


  fetchTopCity = (state) => {
    const url = `${base_url}/topcity?state=${state}`
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    }
    
    axios.get( url, headers).then((response) => {
      console.log("I got here " + response.data)  
      this.setState({topCity: response.data})
      })
      .catch((error) => {
        console.log("No I got here " + error)  
        this.setState({error: error})
      });
  }

  mapHandler = (event) => {
    this.setState({
      selectedState: event.target.dataset.name,
      selectedVenue: undefined,
      zoom: 10,
    })
    this.fetchTopCity(event.target.dataset.name)
  };

  showEvents = () => {
    if (this.state.selectedVenue) {
      return (
        <section>
          <h2 className="show-events-title">Events @ {this.state.selectedVenue.title} - {this.state.selectedVenue.address.city.name}, {this.state.selectedVenue.address.city.state}</h2>
          <List url={`/events?venue=${this.state.selectedVenue.id}`} cardType="event"></List>
        </section>
      )
    } else {
      return (
        <section>
          <h2 className="show-events-title">Events in {this.state.selectedState}</h2>
          <List url={`/events?state=${this.state.selectedState}`} cardType="event"></List>
        </section>
      )
    }
  }


  render() {  
      const { redirect } = this.state;
      if (redirect !== undefined) {
        return <Redirect to={redirect}/>;
      }
      return (
        <section>
        
          <section className="maps-container">
            <div className="google-map-container">
              <GMap
                google={this.props.google}
                zoom={this.state.zoom}
                initialCenter = {`${this.state.topCity.name}, ${this.state.topCity.state} `}
                center={`${this.state.topCity.name}, ${this.state.topCity.state} `}
                collectionURL="/venues/all"
                className="google-map"
                setSelectedVenue={this.setSelectedVenue}
              />
            </div>
            <div className="state-map">
              <Map selectedState={this.state.selectedState} mapHandler={this.mapHandler} />
            </div>
          </section>      
          {this.showEvents()}
        </section>
      )
  }
}

export default ByLocation;