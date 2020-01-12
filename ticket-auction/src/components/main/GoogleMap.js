import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
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
    }
  }

  componentWillMount = () => {
    if (this.props.initialCenter && this.props.collectionURL) {
      Geocode.fromAddress(this.props.initialCenter).then(
        response => {
          this.setState({initialCenter: response.results[0].geometry.location})
        },
        error => {
          return "Error geting geolocation"
        },
      );

      this.geocodeLocation(this.state.initialCenter)
      
      const url = `${base_url}${this.props.collectionURL}`
      const headers = { 
        headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
      }
      this.fetchCollection(url, headers)
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
          return response.results[0].geometry.location
        },
        error => {
          return "Error geting geolocation"
        },
      )
  }

//   geoCodeLocation = async (address) => {
//     const geo = await Promise.all(this.geocodeLocation(address));
//     return geo
// }

  // geoCodeLocations = (collection) => {
  //   const geos = []
  //   for(let i = 0; i < collection.length; i++){
  //     const event = collection[i]
  //     const address = `${event.venue.address.address1} ${event.venue.address.city.name}, ${event.venue.address.city.state} ${event.venue.address.zipCode} `

  //     const geo = this.geocodeLocation(address)
  //     }
  // }

  displayMarkers = () => {
    if(this.state.collection) {
      return this.state.collection.map((event, index) => {
        return <Marker key={index} id={index} position={{ 
          lat: event.venue.address.lat,
          lng: event.venue.address.lng
        }}
        onClick={() => console.log(event.title)} />
      })
    } else {
      return "";
    }
  }

  render() {
    const showMap = () => {
      
      if(this.state.initialCenter && this.state.collection) {
        return (
          <section>
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={this.state.initialCenter}
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