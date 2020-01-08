import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../css/EventCard.css'

const EventCard = (props) => {    
  
  const showEventCard = () => {
    if (props.event) {
      return (
        <div className="card-body">
          <h2>{props.event.title}</h2>
          <img src={props.event.imageUrls[0]} alt={props.event.title} className="eventCard-icon-img"/>
          <Link to={`/events/${props.event.id}`} className="btn btn-primary">Get Tickets</Link>
        </div>
      )
    } else {
      return;
    }
  }

  return (
    <section className="eventCard-container card">
      {showEventCard()}

    </section>
  )
}

export default EventCard;
