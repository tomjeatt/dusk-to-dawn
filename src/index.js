import React from "react";
import ReactDOM from "react-dom";
import DuskToDawn from "./DuskToDawn";

const apiBaseUrl = "https://api.sunrise-sunset.org/json";

ReactDOM.render(
  <DuskToDawn apiBaseUrl={apiBaseUrl} />,
  document.getElementById("root")
);
