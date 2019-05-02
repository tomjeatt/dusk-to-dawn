import React from "react";

const Input = React.forwardRef((props, ref) => (
  <div className="input">
    <button className="geolocate" onClick={props.getLocation}>
      Get current location
    </button>
    <p>Or</p>
    <label htmlFor="autoComplete">Search for a UK location</label>
    <input
      className="autocomplete"
      placeholder="Start typing&hellip;"
      name="autocomplete"
      type="text"
      ref={ref}
    />
  </div>
));

export default Input;
