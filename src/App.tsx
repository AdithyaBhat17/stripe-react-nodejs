import React from "react";
import "./styles.css";
import { CardElement, injectStripe, Elements } from "react-stripe-elements";

function _CardForm(props) {
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let clientSecret: any = await fetch("http://localhost:8080/secret-key", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      clientSecret = await clientSecret.json();
      let confirmation = await props.stripe.confirmCardPayment(
        clientSecret.value,
        {
          payment_method: {
            card: props.elements.getElement("card"),
            billing_details: {
              name: "Jenny Rosen",
              address: "123 State St Schenectady, NY 12345"
            }
          }
        }
      );
      console.log("confirmation:", confirmation);
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
