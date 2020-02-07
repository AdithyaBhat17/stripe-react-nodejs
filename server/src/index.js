require("dotenv").config();
const stripe = require("stripe")(process.env.stripe_key);
const express = require("express");
const app = express();

app.use(require("cors")());

app.get("/secret-key", async (req, res) => {
  try {
    let intent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "inr",
      payment_method_types: ["card"],
      description: "testing",
      metadata: {
        order_id: 555,
        testData: "hello"
      }
    });
    res.status(200).json({ value: intent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

app.listen(8080, () => {
  console.log("server is up and running");
});
