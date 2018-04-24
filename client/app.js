import React from 'react'


import StripeElement from './stripe.js';
import { StripeProvider } from 'react-stripe-elements';


const App = () => {
  return (
    <StripeProvider apiKey='pk_test_I4irKTfvhc4aXA6UzFIOvueM'>
      <StripeElement />
    </StripeProvider>
  )
}

export default App
