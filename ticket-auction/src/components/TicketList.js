import React from 'react';
import TicketCard from './TicketCard';

const TicketList = (props) => {    
  let tickets;
  if (props.tickets) {
    tickets = props.tickets.map((ticket, i) => {
      return (<TicketCard ticket={ticket}/>)
    });
  }

  return (
      <section >
        {tickets}
      </section>
  )
}

export default TicketList;
