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
      autocomplete.setFields(["geometry"]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const {
          geometry: {
            location: { lat, lng }
          }
        } = place;

        this.setState({
          requestGeo: {
            lat: lat(),
            lng: lng()
          }
        });
      });
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
  requestGeo: PropTypes.object
};

export default DuskToDawn;
