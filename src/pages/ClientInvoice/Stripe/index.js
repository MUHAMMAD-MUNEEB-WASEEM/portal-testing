import { loadStripe } from '@stripe/stripe-js';

import { useState } from 'react';
import { useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';

const Stripe = ({ firstName, lastName, email, address, city, zip, amount }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    setStripePromise(
      loadStripe(
        'pk_test_51O34YjIHmGv9NAWXfIlzs4iQHnLtfowyqbyFxXudEGQlNnJ9fJtdWdkB4AwoPEgQSue7GwNhVKwy0hA12evwjlZI00t1TIf6Yo',
      ),
    );
  }, []);

  const MakePaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        // `${process.env.REACT_APP_BASE_URL}/api/v1/payments/stripe/create-payment`,
        `https://invoicing-inviz-91f04ebfd463.herokuapp.com/api/v1/payments/stripe/create-payment`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          city: city,
          zip: zip,
          amount: amount,
        },
      );
      if (data) {
        var clientSecret = data.paymentIntent.client_secret;
        setClientSecret(clientSecret);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch(
    //   `${process.env.REACT_APP_BASE_URL}/api/v1/payments/stripe/create-payment`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       firstName: firstName,
    //       lastName: lastName,
    //       email: email,
    //       address: address,
    //       city: city,
    //       zip: zip,
    //       amount: amount,
    //     }),
    //   }
    // ).then(async (result) => {
    //   let res = await result.json();
    //   //   var { clientSecret } = await result.json();
    //   var clientSecret = res.paymentIntent.client_secret;
    //   console.log("--->", res);
    //   setClientSecret(clientSecret);
    // });
    MakePaymentIntent();
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Stripe;

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import React from "react";
// import CheckoutForm from "./CheckoutForm";

// const Stripe = ({ firstName, lastName, email, address, city, zip, amount }) => {
//   const stripePromise = loadStripe(
//     "pk_test_51O34YjIHmGv9NAWXfIlzs4iQHnLtfowyqbyFxXudEGQlNnJ9fJtdWdkB4AwoPEgQSue7GwNhVKwy0hA12evwjlZI00t1TIf6Yo"
//   );
//   const options = {
//     mode: "payment",
//     amount: amount,
//     currency: "usd",
//     appearance: {
//       /*...*/
//     },
//   };
//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm
//         firstName={firstName}
//         lastName={lastName}
//         email={email}
//         address={address}
//         city={city}
//         zip={zip}
//         amount={amount}
//       />
//     </Elements>
//   );
// };

// export default Stripe;
