import React, { Component } from 'react';
import axios from 'axios';


class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {     
      collection: [],
      error: null,
    };
  }

  componentDidMount = () => {
    const url = "http://api.eventful.com/json/events/search?location=Seattle&category=music&sort_order=popularity"  
    this.fetchEvents(url);
  }

  fetchEvents = (url) => {
    axios.get(url , 
      { params: 
        { 'app_key': 'P6gnvpVgpsMrkVqg'}
      }
    )
    .then((response) => {
      this.setState({collection: response.data.events.event})
    })
    .catch((error) => {
      console.log(error)
    });
  }

  showCollection = () => {
    let eventTable;
    if (this.state.collection) {
    eventTable = this.state.collection.map((event, i) => {
      return (
        <tr key={i}>
          <td>{event.title}</td>
          <td>{event.description}</td>
          <td>{event.venue_name}</td>
          <td>{event.venue_address}</td>
          <td>{event.latitude}</td>
          <td>{event.longitude}</td>
          <td>{event.image.medium.url}</td>
        </tr>
      )
    });
  }
  return eventTable;
}


  render() {
    console.log(this.state.collection)  
    return (
      <table className="table">
      <thead>
        <tr>
          <th>Event Title</th>
          <th>Event Description</th>
          <th>Venue Name</th>
          <th>Venue Address1</th>
          <th>Venue Lat</th>
          <th>Venue Lng</th>
          <th>Img URL</th>
        </tr>
      </thead>
      <tbody>
        {this.showCollection()}
      </tbody>
    </table>
    );
  }

}

export default Data;
