import React from 'react';
import { Link as Link } from 'react-router-dom';
import '../../css/CategoryCard.css'

const CategoryCard = (props) => {    

  return (
    <section className="categoryCard-container card">
      <div className="card-body">
        <h2>{props.category.genre}</h2>
        <img src={props.category.imageUrls[0]} alt={props.category.genre}className="categoryCard-icon-img"/>
        <Link to={`events/category/${props.category.type}/${props.category.genre}`} className="btn btn-primary">Browse Events</Link>
      </div>
    </section>
  )
}

export default CategoryCard;
