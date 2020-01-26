import React, { Component } from 'react';
import TicketCard from '../cards/TicketCard';
import EventCard from '../cards/EventCard';
import CategoryCard from '../cards/CategoryCard';
import CityCard from '../cards/CityCard';
import PerformerCard from '../cards/PerformerCard';
import axios from 'axios';
import '../../css/List.css'
import SPRING_SECURITY from '../../config_spring_keys.js'

const base_url = `${SPRING_SECURITY.base_url}`
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class List extends Component {    
  constructor(props) {
    super(props);

    this.state = {
      collection: undefined,
    }
  }

  componentDidMount = () => {
    const url = `${base_url}${this.props.url}`
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    }
    this.fetchCollection(url, headers);
  }

  componentWillReceiveProps(nextProps) {
    const url = `${base_url}${nextProps.url}`
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    }
    this.fetchCollection(url, headers);
  }

  fetchCollection(url, headers) {
    axios.get( url, headers).then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        console.log(error)
        // this.setState({errors: error})
      });
  }
  
  render() {    
    let collection;
    let containerClass;
    if (this.state.collection) {
      if (this.props.cardType === "ticket") {
        containerClass = "ticketContainer"
        collection = this.state.collection.map((ticket, i) => {
          return (<TicketCard ticket={ticket} key={i}/>)
        });
      } else if (this.props.cardType === "event") {
        containerClass = "eventsContainer"
        let group = this.state.collection
        if (group.length > 50) {
          group = group.slice(0, 50)
        }
        collection = group.map((event, i) => {
            return (<EventCard event={event} key={i}/>)
          });
      } else if (this.props.cardType === "category") {
        containerClass = "categoryContainer"
        collection = this.state.collection.map((category, i) => {
          return (<CategoryCard category={category} key={i}/>)
        });
      } else if (this.props.cardType === "city") {
        containerClass = "cityContainer"
        collection = this.state.collection.map((city, i) => {
          return (<CityCard city={city} key={i}/>)
        });
      } else if (this.props.cardType === "performer") {
        containerClass = "performerContainer"
        collection = this.state.collection.map((performer, i) => {
          return (<PerformerCard performer={performer} key={i}/>)
        }); 
      }
    } else {
      return ("")
    }
    return (
        <section className={`list-container ${containerClass}`} >
          {collection}
        </section>
    )
  }
}

export default List;
