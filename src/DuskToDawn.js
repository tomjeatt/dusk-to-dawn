import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapsLoader from "./utilities/google-maps-loader";
import formatTimestamp from "./utilities/format-timestamp";
import fetchData from "./utilities/fetch-data";
import Output from "./components/output";
import Input from "./components/input";
import "./dusk-to-dawn.css";

class DuskToDawn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sunrise: "",
      sunset: "",
      userGeo: {}
    };

    this.autocompleteField = React.createRef();
  }

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

  handleApiResponse = apiResponse => {
    const {
      responseData: {
        results: { sunrise, sunset },
        status
      }
    } = apiResponse;

    if (status === "OK") {
      this.setState({
        sunrise: formatTimestamp(sunrise),
        sunset: formatTimestamp(sunset)
      });
    } else {
      console.error(`Problem connecting to API, status code ${status}`);
    }
  };

  fetchApiData = async () => {
    const { apiBaseUrl } = this.props;

    const {
      userGeo: { lat, lng }
    } = this.state;

    const apiUrl = `${apiBaseUrl}?lat=${lat}&lng=${lng}&formatted=0`;

    const apiResponse = await fetchData(apiUrl);

    this.handleApiResponse(apiResponse);
  };

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

      this.updateUserGeo(userGeo);
    });
  };

  initialiseAutocompleteApi = () => {
    GoogleMapsLoader.load(google => {
      const options = {
        types: ["geocode"],
        componentRestrictions: { country: ["gb"] }
      };

      // autocomplete field set as callback ref
      const autocomplete = new google.maps.places.Autocomplete(
        this.autocompleteField.current
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

    const error = error => {
      const { code, message } = error;
      console.warn(`Unable to get location. Error (${code}): ${message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  componentDidMount() {
    this.initialiseAutocompleteApi();
  }

  render() {
    const { sunrise, sunset } = this.state;
    const output =
      sunrise && sunset ? <Output sunrise={sunrise} sunset={sunset} /> : "";

    return (
      <div className="dusk-to-dawn">
        <Input ref={this.autocompleteField} getLocation={this.getLocation} />
        {output}
      </div>
    );
  }
}

DuskToDawn.propTypes = {
  sunrise: PropTypes.string,
  sunset: PropTypes.string,
  userGeo: PropTypes.object
};

export default DuskToDawn;
