import React from "react";
import ReactDOM from "react-dom";
import { StripeProvider } from "react-stripe-elements";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StripeProvider apiKey="your_api_key">
    <App />
  </StripeProvider>,
  rootElement
);
