import React from "react";

const Input = React.forwardRef((props, ref) => (
  <div className="input">
    <label htmlFor="autoComplete">Autocomplete</label>
    <input
      className="autocomplete"
      placeholder="Start typing&hellip;"
      name="autocomplete"
      type="text"
      ref={ref}
    />
    <button onClick={props.getLocation}>Get your location</button>
  </div>
));

export default Input;
