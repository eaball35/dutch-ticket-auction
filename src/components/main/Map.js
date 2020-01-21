import React, { Component } from 'react';
import USAMap from "react-usa-map";
import '../../css/Map.css' 

class Map extends Component {
 
  statesCustomConfig = () => {
    const output = {}
    output[this.props.selectedState] = {fill: "#3D5969"}
    
    return output;
  };

  render() {
    return (
      <div className ="USA-map-container">
        <USAMap customize={this.statesCustomConfig()} onClick={this.props.mapHandler} width="50%" height="50%" />
      </div>
    );
  }
}

export default Map;