import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../css/EventCard.css'

const EventCard = (props) => {    
  
  const showEventCard = () => {
    if (props.event) {
      return (
        <div className="card-body">
        <h2> <Link to={`/tickets/event/${props.event.id}`}>{props.event.title} </Link> </h2>
        <img src={props.event.imageUrls[0]} alt={props.event.title} className="eventCard-icon-img"/>
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
