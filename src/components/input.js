import React from "react";

const Input = React.forwardRef((props, ref) => (
  <div className="component input">
    <button className="geolocate-control" onClick={props.getLocation}>
      Get current location
    </button>
    <p class="field-divider">&#8212;Or&#8212;</p>
    <label className="input-label" htmlFor="autoComplete">
      Search for a UK location
    </label>
    <input
      className="input-field"
      placeholder="Start typing&hellip;"
      name="autocomplete"
      type="text"
      ref={ref}
    />
  </div>
));

export default Input;
