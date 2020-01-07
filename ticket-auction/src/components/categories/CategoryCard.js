import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../css/CategoryCard.css'

const CategoryCard = (props) => {    

  return (
    <section className="categoryCard-container card">
      <div className="card-body">
        <h2> <Link to={`events/category/${props.category.type}/${props.category.genre}`}>{props.category.genre} </Link> </h2>
        <img src={props.category.imageUrls[0]} alt={props.category.genre}className="categoryCard-icon-img"/>
      </div>
    </section>
  )
}

export default CategoryCard;
