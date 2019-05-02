import GoogleMapsLoader from "./google-maps-loader";

const getAutoCompleteApi = async () => {
  GoogleMapsLoader.load(google => {
    const options = {
      types: ["geocode"]
    };

    // autocomplete field set as callback ref
    const autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteField,
      options
    );

    // Only need to return geometry data as the latLng functions
    // are what is needed from the response
    autocomplete.setFields(["geometry"]);

    return autocomplete;
  });
};

export default getAutoCompleteApi;
