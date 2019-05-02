import React from "react";

const Output = props => {
  return (
    <div className="outputs">
      {props.sunrise},{props.sunset}
    </div>
  );
};

export default Output;
