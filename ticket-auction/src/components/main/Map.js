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
      <div>
        <USAMap customize={this.statesCustomConfig()} onClick={this.props.mapHandler} />
      </div>
    );
  }
}

export default Map;