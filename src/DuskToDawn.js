import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapsLoader from "./utilities/google-maps-loader";
import fetchData from "./utilities/fetch-data";

class DuskToDawn extends Component {
  fetchApiData = async () => {
    const { apiBaseUrl } = this.props;

    const {
      userGeo: { lat, lng }
    } = this.state;

    const apiUrl = `${apiBaseUrl}?lat=${lat}&lng=${lng}`;

    const apiResponse = await fetchData(apiUrl);

    // TODO: proper error handling
    this.setState({
      apiResponse
    });
  };

  updateUserGeo = userGeo => {
    this.setState(
      {
        userGeo
      },
      () => {
        this.fetchApiData();
      }
    );
  };

  // Move autocomplete to props
  handleAutocompleteResponse = autocomplete => {
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

      this.handleAutocompleteResponse(autocomplete);
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
        lat: latitude,
        lng: longitude
      };

      this.updateUserGeo(userGeo);
    };

    const error = err => {
      console.warn(`Error: (${err.code}): ${err.message}`);
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
  apiResponse: PropTypes.object,
  userGeo: PropTypes.object
};

export default DuskToDawn;

// Get british summertime
