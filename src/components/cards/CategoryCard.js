import React from 'react';
import { Link as Link } from 'react-router-dom';
import '../../css/CategoryCard.css'

const CategoryCard = (props) => {    

  const url = `events/category/${props.category.type}/${props.category.genre}`
  const genre = props.category.genre
  const image = () => {
        if ( props.category.imageUrls) {
          return <img src={props.category.imageUrls[0]} alt={genre} className="category-img"/>
        } else {
          return props.category.genre
        }
  }

  return (
    <section className="card category-card-container">
      <div className="category-card">
        <Link to={url} >
          {image()}
          <div className="centered">
            {genre}
          </div>
        </Link>
      </div>
    </section>
  )
}

export default CategoryCard;
