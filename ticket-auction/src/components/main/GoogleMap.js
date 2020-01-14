import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import '../../css/GoogleMap.css'
import GOOGLE_SECURITY from '../../config_google_api_keys.js'
import Geocode from "react-geocode";
import axios from 'axios';
import SPRING_SECURITY from '../../config_spring_keys.js'

const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

Geocode.setApiKey(GOOGLE_SECURITY);
Geocode.setLanguage("en");
Geocode.setRegion("en");
Geocode.enableDebug();

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: undefined,
      initialCenter: undefined,
      center: undefined,
      
      selectedVenue: undefined,
    }
  }

  componentWillMount = () => {
    if (this.props.initialCenter && this.props.collectionURL) {
      this.geocodeLocation(this.props.initialCenter)
      
      const url = `${base_url}${this.props.collectionURL}`
      const headers = { 
        headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
      }
      this.fetchCollection(url, headers)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps){
      this.geocodeLocation(nextProps.center)
    }
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

  geocodeLocation = (location) => { 
      Geocode.fromAddress(location).then(
        response => {
          this.setState({
            initialCenter: response.results[0].geometry.location,
            center: response.results[0].geometry.location  
          })
        },
        error => {
          return "Error geting geolocation"
        },
      )
  }

  onMarkerClick = (venue) => {
    this.props.setSelectedVenue(venue)
  }  


  displayMarkers = () => {    
    if(this.state.collection) {
      return this.state.collection.map((venue, index) => {
        return (
            <Marker 
              title={venue.title}
              name={venue.title}
              key={index} 
              id={index} 
              position= {{ 
                lat: venue.address.lat,
                lng: venue.address.lng
              }}
              visible={true}
              onClick={() => this.onMarkerClick(venue)}>
            </Marker>
        )
      })
    } else {
      return "";
    }
  }

  showVenueTitle = () => {
    if (this.state.selectedVenue) {
      return (<h1>{this.state.selectedVenue.title}</h1>)
    } else {
      return ""
    }
  }

  render() {
    const showMap = () => {    
      if(this.state.center && this.state.collection) {
        return (
          <section>
            <Map
              google={this.props.google}
              zoom={10}
              style={mapStyles}
              initialCenter={this.state.initialCenter}
              center={this.state.center}
              className="google-map"
            >
              {this.displayMarkers()}
            </Map>
          </section>
        )
      }
    }

    return (
        <section>
          {showMap()}
        </section>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_SECURITY
})(MapContainer);