  import React, { Component } from 'react';
import axios from 'axios';
import TicketTable from '../main/TicketTable';
import '../../css/Event.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import GMap from '../main/GoogleMap.js';
import SPRING_SECURITY from '../../config_spring_keys.js'

var dateFormat = require('dateformat');

const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {     
      event: this.props.event,
      error: null,
    };
  }

  componentDidMount = () => {
    const url = `${base_url}/events/${this.props.match.params.id}`  
    this.fetchEvent(url);
  }

  fetchEvent = (url) => {
    axios.get(url,
      { headers: 
        { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
      }
    ).then((response) => {
      this.setState({event: response.data})
    })
    .catch((error) => {
      this.setState({error: error.response})
    });
  }


render() {
    const eventDetails = this.state.event

    const showEvent = () => {
      if(this.state.event) {
        const start = dateFormat(eventDetails.start, "dddd, mmmm dS, yyyy, h:MM TT")
        return (
          <section>
            
            <section className="event-container">
              <img src={eventDetails.imageUrls} alt={eventDetails.title} className='event-img'/>
              <div className="event-details">
                <h6>EVENT</h6>
                <h4>{start} </h4>
                <h1>{eventDetails.title}</h1>
                <h2>
                  <Link to={`/events/performer/${eventDetails.performer[0].name}/${eventDetails.performer[0].id}`}>{eventDetails.performer[0].name} </Link>
                </h2>
                <h2>@ {eventDetails.venue.title}  |  {eventDetails.venue.address.city.name}, {eventDetails.venue.address.city.state} </h2>
                <p>{eventDetails.eventDetails}</p>
              </div>

              <div className="google-map-container">
                <GMap
                  google={this.props.google}
                  zoom={5}
                  initialCenter={`${eventDetails.venue.address.city.name}, ${eventDetails.venue.address.city.state} `}
                  collectionURL={`/venues/${eventDetails.venue.id}`}
                  className="google-event-map"
                  singleCollection={true}
                />
              </div>
            </section>


            <section className ="ticket-table-container">
              <h2>Browse Ticket Listings</h2>
              <TicketTable url={`/tickets/event/${this.props.match.params.id}`}/>
            </section>

          </section>
        )
        
      } else {
        return "";
      }
    }

    return (showEvent())
  }
}

export default Event;
