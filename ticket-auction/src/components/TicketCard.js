import React from 'react';

const TicketCard = (props) => {    

  return (
    <div>
      <p>Event - {props.ticket.event}</p>
      <strong><p>Id - {props.ticket.id}</p></strong>
      ------
    </div>
  )
}

export default TicketCard;
