import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const LocationCard = (props) => {    
  
  const showLocationCard = () => {
    if (props.location) {
      return (
        <div className="card-body">
        <h2> 
          <Link to={`/events/city/${props.location.city}`}>{props.location.city}</Link> 
        </h2>
      </div>
      )
    } else {
      return;
    }
  }

  return (
    <section className="locationCard-container card">
      {showLocationCard()}
    </section>
  )
}

export default LocationCard;
