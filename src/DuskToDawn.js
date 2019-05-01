import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapsLoader from "./utilities/google-maps-loader";

class DuskToDawn extends Component {
  initialisePlacesApi = () => {
    GoogleMapsLoader.load(google => {
      const options = {
        componentRestrictions: { country: ["gb"] },
        types: ["geocode"]
      };

      const autocomplete = new google.maps.places.Autocomplete(
        this.autocompleteField
      );
      autocomplete.setOptions(options);
    });
  };

  componentDidMount() {
    this.initialisePlacesApi();
  }

  render() {
    return (
      <div className="DuskToDawn">
        <label htmlFor="autoComplete">Autocomplete</label>
        <input
          className="autocomplete"
          placeholder="type a thing yeah?"
          name="autocomplete"
          type="text"
          ref={ref => (this.autocompleteField = ref)}
        />
      </div>
    );
  }
}

DuskToDawn.propTypes = {
  autocomplete: PropTypes.object,
  false: PropTypes.bool
};

export default DuskToDawn;
