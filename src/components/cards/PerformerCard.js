import React from 'react';
import { Link as Link } from 'react-router-dom';
import '../../css/PerformerCard.css'

const PerformerCard = (props) => {    

  const url = `/events/performer/${props.performer.name}/${props.performer.id}`
  const performer = props.performer.name
  const image =  <img src={props.performer.imageUrls[0]} alt={props.performer.name}className="performer-img"/>

  return (
    <section className="card performer-card-container">
      <div className="performer-card">
        <Link to={url} >
          <div className="performer-text">
            {performer}
          </div>  
          {image}
        </Link>
      </div>
    </section>
  )
}

export default PerformerCard;

