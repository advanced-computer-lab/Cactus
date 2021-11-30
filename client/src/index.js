import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const PUBLIC_KEY = "pk_test_51JuGmbLQ3FOQnPag2Ykl6ygx54ZbC7ii7rwGkfDWzg3SLzkbnUjoHIhVPG0aTiAGc6nMqsJzGfJkqulIToO8hA3L00bnY2c5ip"
const stripePromise = loadStripe(PUBLIC_KEY);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);


