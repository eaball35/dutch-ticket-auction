import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../css/TicketCard.css'

const TicketCard = (props) => {    

  return (
    <section className="ticketCard-container card">
      <div className="card-body">
        <h2> Event - {props.ticket.event.title} </h2>
        <img src={props.ticket.event.imageUrls[0]} alt={props.ticket.event.title} className="ticketCard-icon-img"/>
        <Link to={`/tickets/${props.ticket.id}`}>Ticket Id - {props.ticket.id} </Link>
      </div>
    </section>
  )
}

export default TicketCard;
