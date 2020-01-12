import React, { Component } from 'react';
import axios from 'axios';
import TicketTable from '../main/TicketTable';
// import '../../css/Event.css';
import SPRING_SECURITY from '../../config_spring_keys.js'

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
        return (
          <section>
            <section>
              <img src={eventDetails.imageUrls} alt={eventDetails.title} className='event-img'/>
              <h1>{eventDetails.title}</h1>
              <h2>{eventDetails.artist}</h2>
              <h4>{eventDetails.start} </h4>
              <h2>@ {eventDetails.venue.title}  |  {eventDetails.venue.address.city.name}, {eventDetails.venue.address.city.state} </h2>
              <p>{eventDetails.eventDetails}</p>
            </section>


            <section>
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
