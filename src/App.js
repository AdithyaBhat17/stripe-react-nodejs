import React from "react";
import "./styles.css";
import { CardElement, injectStripe, Elements } from "react-stripe-elements";

function _CardForm(props) {
  const handleSubmit = async e => {
    e.preventDefault();
    let clientSecret = await fetch("", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    try {
      props.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: props.elements.getElement("card"),
          billing_details: {
            name: "Jenny Rosen"
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Payment Details
        <CardElement />
      </label>
      <input type="submit" value="Complete Payment" />
    </form>
  );
}

const CardForm = injectStripe(_CardForm);

function App() {
  return (
    <Elements>
      <CardForm />
    </Elements>
  );
}

export default App;
