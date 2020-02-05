import React from "react";
import ReactDOM from "react-dom";
import { StripeProvider } from "react-stripe-elements";

import App from "./App";

console.log(process.env.REACT_APP_STRIPE_KEY);

const rootElement = document.getElementById("root");
ReactDOM.render(
  // @ts-ignore
  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
    <App />
  </StripeProvider>,
  rootElement
);
