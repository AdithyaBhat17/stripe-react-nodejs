import React, { FormEvent, useState } from "react";
import "./styles.css";
import { CardElement, injectStripe, Elements } from "react-stripe-elements";

function _CardForm(props) {
  let [error, setError] = useState<string>("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    error && setError("");
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
              address: "10901 W. 120th Ave, Suite 235 Broomfield, CO 80021"
            }
          }
        }
      );
      if (confirmation.error)
        setError(
          confirmation.error.message || "Something's wrong I can feel it"
        );
    } catch (error) {
      console.error(error);
      setError(error.message || "Something's wrong I can feel it");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Payment Details
        <CardElement />
      </label>
      <input type="submit" value="Complete Payment" />
      <br />
      <span style={{ color: "red" }}>{error}</span>
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
