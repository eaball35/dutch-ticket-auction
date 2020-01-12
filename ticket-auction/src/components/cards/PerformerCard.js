import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../css/PerformerCard.css'

const PerformerCard = (props) => {    

  return (
    <section className="performerCard-container card">
      <div className="card-body">
        <h2>{props.performer.name}</h2>
        <h4>{props.performer.description}</h4>
        <img src={props.performer.imageUrls[0]} alt={props.performer.name}className="performerCard-icon-img"/>
        <Link to={`/events/performer/${props.performer.name}/${props.performer.id}`} className="btn btn-primary">Browse Events </Link>
      </div>
    </section>
  )
}

export default PerformerCard;
