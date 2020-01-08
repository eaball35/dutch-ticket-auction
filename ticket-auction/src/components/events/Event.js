import React, { Component } from 'react';
import axios from 'axios';
import TicketTable from '../ticketListing/TicketTable';
// import '../../css/Event.css';

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {     
      event: this.props.event,
      error: null,
    };
  }

  componentDidMount = () => {
      this.fetchEvent();
  }

  fetchEvent = () => {
    axios.get(`http://localhost:8080/events/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({event: response.data})
      })
      .catch((error) => {
        this.setState({error: error.response})
      });
  }


render() {
    const eventDetails = this.state.event

    const showEvent = () => {
      console.log(this.state.event)
      if(this.state.event) {
        return (
          <section>
            <section>
              <img src={eventDetails.imageUrls} alt={eventDetails.title} className='event-img'/>
              <h1>{eventDetails.title}</h1>
              <h2>{eventDetails.artist}</h2>
              <h4>{eventDetails.start} </h4>
              <h2>@ {eventDetails.venue.title}  |  {eventDetails.venue.location.city}, {eventDetails.venue.location.state} </h2>
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
