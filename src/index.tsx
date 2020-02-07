import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import { StripeProvider } from "react-stripe-elements";
import App from "./App";

dotenv.config();

console.log(process.env.REACT_APP_SECRET_KEY);

const rootElement = document.getElementById("root");
ReactDOM.render(
  // @ts-ignore
  <StripeProvider apiKey={process.env.REACT_APP_SECRET_KEY}>
    <App />
  </StripeProvider>,
  rootElement
);
