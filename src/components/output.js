import React from "react";

const Output = props => {
  return (
    <div className="outputs">
      <div className="response">
        {props.sunrise},{props.sunset}
      </div>
      <div className="attribution">
        Sunrise and sunset times courtesy of{" "}
        <a href="https://sunrise-sunset.org/api">
          Sunset and sunrise times API
        </a>
      </div>
    </div>
  );
};

export default Output;
