  import React, { Component } from 'react';
import axios from 'axios';
import TicketTable from '../main/TicketTable';
import '../../css/Event.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import GMap from '../main/GoogleMap.js';
import SPRING_SECURITY from '../../config_spring_keys.js'

var dateFormat = require('dateformat');

const base_url = `${SPRING_SECURITY.base_url}`
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
            { (eventDetails.imageUrls)
                ?<img src={eventDetails.imageUrls[0]} alt={eventDetails.title} className='event-img'/>
                : <img src="https://images.squarespace-cdn.com/content/v1/57f0719c725e25e914a27b76/1476469701090-IYP1U1RNY0D3M72C5H3A/ke17ZwdGBToddI8pDm48kCIq0XyLJJk2FAWEONnCmDZZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzlBBQXEp281-O-7PPigqE00Dc4AsyuOsfxkxOwUQ9vmPojz-kpU2wdTDZ9661s8ZQ/events-heavenly-header.jpg?format=1500w" alt="default-event-img" className='event-img'/>
              }
                            
              <div className="event-details">
                <h6>EVENT</h6>
                <h4>{start} </h4>
                <h1>{eventDetails.title}</h1>
                <h2>{
                    (eventDetails.performer)
                    ? <Link to={`/events/performer/${eventDetails.performer[0].name}/${eventDetails.performer[0].id}`}>{eventDetails.performer[0].name} </Link>
                    : null
                  }
                </h2>
                {(eventDetails.venue && eventDetails.venue.address )
                  ? <h2>@ {eventDetails.venue.title}  |  {eventDetails.venue.address.city.name}, {eventDetails.venue.address.city.state} </h2>
                  : <h2></h2>
                }
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
              <TicketTable url={`/tickets/event/${this.props.match.params.id}`} show={false}/>
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
