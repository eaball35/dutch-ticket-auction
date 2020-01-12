import React, { Component } from 'react';
import axios from 'axios';
import '../../css/List.css'
import SPRING_SECURITY from '../../config_spring_keys.js'
import CityCard from '../cards/CityCard';

const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class TopCities extends Component {    
  constructor(props) {
    super(props);

    this.state = {
      collection: undefined,
      error: undefined,
    }
  }

  componentDidMount = () => {
    this.fetchCollection(this.props.selectedState);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps){
      this.fetchCollection(nextProps.selectedState);
    }
  }

  fetchCollection(state) {
    const url = `${base_url}/cities/state/${state}`
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    }
    
    axios.get( url, headers).then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        this.setState({error: error})
      });
  }
  
  render() {    
    let collection;
    if (this.state.collection) {
        collection = this.state.collection.map((city,i) => {
          return (<CityCard city={city} key={i}/>)
        });
    } else {
      return "None available"
    }
    return (
      <section>
      {collection}
      </section>
    )
  }
}

export default TopCities;
