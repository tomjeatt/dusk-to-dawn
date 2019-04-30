import React, { Component } from "react";
import GoogleMapsLoader from "./utilities/google-maps-loader";

class DuskToDawn extends Component {
  state = {
    google: undefined
  };

  initialiseApi = () => {
    GoogleMapsLoader.load(google => {
      const service = new google.maps.places.AutocompleteService();
      console.log(service);
    });
  };

  componentDidMount() {
    this.initialiseApi();
  }

  render() {
    return (
      <div className="DuskToDawn">
        <header>
          <h1>Dusk to dawn</h1>
        </header>
      </div>
    );
  }
}

export default DuskToDawn;
