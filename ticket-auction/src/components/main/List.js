import React, { Component } from 'react';
import TicketCard from '../ticketListing/TicketCard';
import EventCard from '../events/EventCard';
import CategoryCard from '../categories/CategoryCard';
import axios from 'axios';
import '../../css/List.css'

class List extends Component {    
  constructor(props) {
    super(props);

    this.state = {
      collection: undefined,
    }
  }

  componentDidMount = () => {
    const url = `http://localhost:8080/${this.props.url}`
    this.fetchData(url);
  }

  fetchData(url) {
    axios.get(url)
      .then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        console.log(error)
        // this.setState({errors: error})
      });
  }
  
  render() {
    let collection;
    if (this.state.collection) {
      if (this.props.cardType === "ticket") {
        collection = this.state.collection.map((ticket, i) => {
          return (<TicketCard ticket={ticket} key={i}/>)
        });
      } else if (this.props.cardType === "event") {
        collection = this.state.collection.map((event, i) => {
            return (<EventCard event={event} key={i}/>)
          });
      } else if (this.props.cardType === "category") {
        collection = this.state.collection.map((category, i) => {
          return (<CategoryCard category={category} key={i}/>)
        });
      }
    }
    return (
        <section className="List-container" >
          {collection}
        </section>
    )
  }
}

export default List;
