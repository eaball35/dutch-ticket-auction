import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const CityCard = (props) => {    
  
  const showCityCard = () => {
    if (props.city) {
      return (
        <div className="card-body">
        <h2> 
          <Link to={`/events/city/${props.city.name}`}>{props.city.name}</Link> 
        </h2>
      </div>
      )
    } else {
      return;
    }
  }

  return (
    <section className="cityCard-container card">
      {showCityCard()}
    </section>
  )
}

export default CityCard;
