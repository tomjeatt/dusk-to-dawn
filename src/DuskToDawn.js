import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapsLoader from "./utilities/google-maps-loader";

class DuskToDawn extends Component {
  // If no value is passed property and value are set from property
  updateState = (property, value) => {
    this.setState(prevState => ({
      ...prevState,
      [property]: value
    }));
  };

  handleAutocompleteResponse = () => {
    const { autocomplete } = this.state;

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      // Retrieve geo data from place response
      const {
        geometry: {
          location: { lat, lng }
        }
      } = place;

      // Run geo functions to create latLng object
      const userGeo = { lat: lat(), lng: lng() };

      this.updateState("userGeo", userGeo);
    });
  };

  initialisePlacesApi = () => {
    GoogleMapsLoader.load(google => {
      const options = {
        types: ["geocode"]
      };

      // autocomplete field set as callback ref
      const autocomplete = new google.maps.places.Autocomplete(
        this.autocompleteField
      );

      autocomplete.setOptions(options);

      // Only need to return geometry data as the latLng functions
      // are what is needed from the response
      autocomplete.setFields(["geometry"]);

      this.setState(
        {
          autocomplete
        },
        () => {
          this.handleAutocompleteResponse();
        }
      );
    });
  };

  getLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = position => {
      const {
        coords: { latitude, longitude }
      } = position;

      const userGeo = {
        latitude,
        longitude
      };

      this.updateState("userGeo", userGeo);
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
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
        <button onClick={this.getLocation}>Get location</button>
      </div>
    );
  }
}

DuskToDawn.propTypes = {
  autocompleteInstance: PropTypes.object,
  geolocationAvailable: PropTypes.bool,
  userGeo: PropTypes.object
};

export default DuskToDawn;
