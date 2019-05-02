import React from "react";
import sunriseIcon from "../assets/icons/sunrise.svg";
import sunsetIcon from "../assets/icons/sunset.svg";

const Output = props => {
  return (
    <div className="component output">
      <div className="response">
        <section className="response-section">
          <h2 className="response-section-heading">Sunrise</h2>
          <img className="response-section-image" src={sunriseIcon} alt="" />
          <p>{props.sunrise}</p>
        </section>
        <section className="response-section">
          <h2 className="response-section-heading">Sunset</h2>
          <img className="response-section-image" src={sunsetIcon} alt="" />
          <p>{props.sunset}</p>
        </section>
      </div>
      <div className="attribution">
        Sunrise and sunset times courtesy of{" "}
        <a href="https://sunrise-sunset.org/api">
          Sunset and sunrise times API.
        </a>{" "}
        Sunrise and sunset icons sunrise by Weltenraser from{" "}
        <a href="https://thenounproject.com/weltenraser/">the Noun Project</a>
      </div>
    </div>
  );
};

export default Output;
